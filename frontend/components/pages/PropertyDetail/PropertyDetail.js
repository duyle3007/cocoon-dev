import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
      try {
        const { data: resMoto } = await axios.get(
          "https://cocoonluxury.in/wp-json/mphb/v1/accommodation_types",
          {
            auth: {
              username: process.env.NEXT_PUBLIC_MOTOPRESS_USERNAME,
              password: process.env.NEXT_PUBLIC_MOTOPRESS_PASSWORD,
            },
          }
        );
        const { data: resWp } = await axios.get(
          "https://cocoonluxury.in/wp-json/wp/v2/mphb_room_type"
        );
        const propertyDetailInWp = resWp.find(
          (property) => property.slug === propertySlug
        );
        const propertyDetailInMoto = resMoto.find(
          (property) => property.id === propertyDetailInWp.id
        );

        setPropertyDetail({ ...propertyDetailInMoto, ...propertyDetailInWp });
      } catch (e) {
        console.log("fetch detail error", e);
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
