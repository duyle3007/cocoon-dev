import { useRouter } from "next/router";
import { Divider } from "antd";

import Image from "@/components/Image/Image";
import HotelCard from "@/components/HotelCard/HotelCard";
import FormEnquiry from "./FormEnquiry/FormEnquiry";
import ContactUs from "./ContactUs/ContactUs";

import styles from "./EnquiryPage.module.scss";

const tempCard = {
  name: "Matilda Mansion – Kyle Bay",
  price: "5000",
  location: "New York",
  thumbnailUrl:
    "https://img.freepik.com/free-photo/swimming-pool_74190-2109.jpg",
};

const EnquiryPage = () => {
  const router = useRouter();
  return (
    <div className={styles.enquiryPage}>
      <div className={styles.upperForm}>
        <div className={styles.backBtn} onClick={() => router.back()}>
          <Image src="/leftArrow.png" />
          BACK
        </div>
        <h1>MAKE AN INQUIRY</h1>
        <div className={styles.form}>
          <HotelCard item={tempCard} className={styles.hotelCard} />
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
