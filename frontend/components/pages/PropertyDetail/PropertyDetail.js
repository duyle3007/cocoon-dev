import { Breadcrumb } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

import PropertyImage from "./PropertyImage/PropertyImage";
import PropertyIntro from "./PropertyIntro/PropertyIntro";
import MainTab from "./MainTab/MainTab";
import Calendar from "./Calendar/Calendar";
import RelatedVilla from "./RelatedVilla/RelatedVilla";

import styles from "./PropertyDetail.module.scss";

const PropertyDetail = ({ propertyDetail }) => {
  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (!renderClientSideComponent) {
    return <></>;
  }
  return (
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

      <MainTab info={propertyDetail} />
      <Calendar info={propertyDetail} />
      {propertyDetail.acf.related_villas.length > 0 && (
        <RelatedVilla info={propertyDetail} />
      )}
    </div>
  );
};

export default PropertyDetail;
