import { Breadcrumb, Spin, notification } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const {wordpressAPIUrl, motopressAPIUrl, motopressUsername, motopressPassword} = publicRuntimeConfig;

import PropertyImage from "./PropertyImage/PropertyImage";
import PropertyIntro from "./PropertyIntro/PropertyIntro";
import MainTab from "./MainTab/MainTab";
import Calendar from "./Calendar/Calendar";
import RelatedVilla from "./RelatedVilla/RelatedVilla";

import styles from "./PropertyDetail.module.scss";

const PropertyDetail = () => {
  const router = useRouter();

  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRenderClientSideComponent(true);
    const propertySlug = router.query.name;

    const fetchAccomodationDetail = async () => {
      setLoading(true);
      const getAccommodationTypes = axios.get(
        `${motopressAPIUrl}/accommodation_types?slug=${propertySlug}`,
        {
          auth: {
            username: motopressUsername,
            password: motopressPassword,
          },
        }
      );

      const getRoomTypes = axios.get(
        `${wordpressAPIUrl}/mphb_room_type?slug=${propertySlug}`
      );

      Promise.all([getAccommodationTypes, getRoomTypes])
        .then(async ([resMoto, resWp]) => {
          const { data: resMotoData } = resMoto;
          const { data: resWpData } = resWp;

          // Calculate booking from beginning of current month to next 6 months
          const startDate = `${dayjs().year()}-${dayjs().month() + 1}-01`;
          const endDate = dayjs(startDate)
            .add(6, "months")
            .format("YYYY-MM-DD");
          const {
            data: { data: bookedDates },
          } = await axios.get("/api/booking", {
            params: {
              accommodation_type: resWpData[0].id,
              startDate: startDate,
              endDate: endDate,
              status: "confirmed",
            },
          });

          setPropertyDetail({
            ...resMotoData[0],
            ...resWpData[0],
            bookedDates: bookedDates.map((date) => ({
              startDate: date.check_in_date,
              endDate: date.check_out_date,
            })),
          });
        })
        .catch((e) => {
          notification.error({ message: e.response?.data?.error?.props || e });
          console.log(
            "fetch detail error",
            e.response?.data?.error?.props || e
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchAccomodationDetail();
  }, [router]);

  if (!renderClientSideComponent) {
    return <></>;
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.propertyDetail}>
        <Breadcrumb
          className={styles.breadcumb}
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: <Link href="/search">Holiday</Link>,
            },
            {
              title: (
                <div
                  className={styles.breadcumbActive}
                  dangerouslySetInnerHTML={{
                    __html: propertyDetail?.title?.rendered,
                  }}
                ></div>
              ),
            },
          ]}
        />
        <div className={styles.propertyMainView}>
          <PropertyImage listImage={propertyDetail?.images} />
          <PropertyIntro info={propertyDetail} />
        </div>

        {propertyDetail && (
          <>
            <MainTab info={propertyDetail} />
            <Calendar info={propertyDetail} />
            {propertyDetail?.acf.related_villas.length > 0 && (
              <RelatedVilla info={propertyDetail} />
            )}
          </>
        )}
      </div>
    </Spin>
  );
};

export default PropertyDetail;
