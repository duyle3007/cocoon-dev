import { useRouter } from "next/router";
import { Divider } from "antd";
import { useContext, useMemo } from "react";

import { PropertyListContext } from "@/components/Layout/Layout";
import Image from "@/components/Image/Image";
import HotelCard from "@/components/HotelCard/HotelCard";
import FormEnquiry from "./FormEnquiry/FormEnquiry";
import ContactUs from "./ContactUs/ContactUs";

import styles from "./EnquiryPage.module.scss";

const EnquiryPage = () => {
  const router = useRouter();
  const { propertyList } = useContext(PropertyListContext);

  const inquiryProperty = useMemo(() => {
    if (router.query.propertyId) {
      return propertyList.find(
        (property) => property.id == router.query.propertyId
      );
    }
  }, [propertyList]);

  return (
    <div className={styles.enquiryPage}>
      <div className={styles.upperForm}>
        <div className={styles.backBtn} onClick={() => router.back()}>
          <Image src="/leftArrow.png" />
          <span>BACK</span>
        </div>
        <h1>MAKE AN INQUIRY</h1>
        <div className={styles.form}>
          <HotelCard item={inquiryProperty} className={styles.hotelCard} />
          <FormEnquiry />
        </div>
        <div className={styles.enquiryBannerWrapper}>
          <Image
            src="/enquiryPage/enquiryBanner.png"
            className={styles.enquiryBanner}
          />
          <div className={styles.enquiryIntro}>
            <h4>COCOON LUXURY ACCOMODATION</h4>
            <Divider className="min-w-[106px] w-fit" />
            <div className={styles.info}>
              <Image src="/locationIcon.svg" />
              90, Pitt St, Sydney, NSW 2000
            </div>
            <div className={styles.info}>
              <Image src="/phoneIcon.svg" />
              0407 008 176
            </div>
            <div className={styles.info}>
              <Image src="/emailIcon.svg" />
              julian@cocoonluxuryproperties.com
            </div>
            <div className={styles.info}>
              <Image src="/emailIcon.svg" />
              manish@cocoonluxuryproperties.com
            </div>
          </div>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default EnquiryPage;
