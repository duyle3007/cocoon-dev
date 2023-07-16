import { Breadcrumb, Spin, notification } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";

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
        "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
        {
          auth: {
            username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
            password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
          },
        }
      );

      const getRoomTypes = axios.get(
        "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
      );

      try {
        const [
          {
            data: { data: resWpData },
          },
          {
            data: { data: resMotoData },
          },
        ] = await Promise.all([getAccommodationTypes, getRoomTypes]);
        const propertyDetailInWp = resWpData.find(
          (property) => property.slug === propertySlug
        );
        const propertyDetailInMoto = resMotoData.find(
          (property) => property.id === propertyDetailInWp.id
        );

        // Calculate booking from beginning of current month to next 6 months
        const startDate = `${moment().year()}-${moment().month() + 1}-01`;
        const endDate = moment(startDate).add(6, "months").format("YYYY-MM-DD");
        const {
          data: { data: bookedDates },
        } = await axios.get("/api/booking", {
          params: {
            accommodation_type: propertyDetailInWp.id,
            startDate: startDate,
            endDate: endDate,
          },
        });

        setPropertyDetail({
          ...propertyDetailInMoto,
          ...propertyDetailInWp,
          bookedDates: bookedDates.map((date) => ({
            startDate: date.check_in_date,
            endDate: date.check_out_date,
          })),
        });
      } catch (e) {
        notification.error({ message: "here is error" });
        console.log("fetch detail error", e.response.data.error.props || e);
      } finally {
        setLoading(false);
      }
    };
    fetchAccomodationDetail();
  }, []);

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
