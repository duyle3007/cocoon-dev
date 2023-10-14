import { Divider } from "antd";
import { useEffect, useState } from "react";

import Image from "@/components/Image/Image";
import Service from "./Service/Service";
import CocoonInstagram from "../HomePage/CocoonInstagram/CocoonInstagram";

import styles from "./AboutUsPage.module.scss";

const AboutUsPage = () => {
  const [renderClientSideComponent, setRenderClientSideComponent] =
    useState(false);

  useEffect(() => {
    setRenderClientSideComponent(true);
  }, []);

  if (!renderClientSideComponent) {
    return <></>;
  }
  return (
    <div className={styles.aboutUsPage}>
      <div className={styles.upperIntro}>
        <div className={styles.properties}>
          <div className={styles.left}>
            <h4> Cocoon Luxury Properties</h4>
            <Divider />
            <div className={styles.content}>
              Cocoon Luxury Properties presents a curated selection of{" "}
              <b>exquisite five-star properties</b>, meticulously chosen to
              provide our guests with the{" "}
              <b>ultimate luxury holiday experience.</b>
            </div>
            <br />
            <div className={styles.content}>
              Our portfolio boasts an exceptional array of opulent
              accommodations, ranging from picturesque <b>waterfront estates</b>{" "}
              and charming <b>beachfront houses</b> to sophisticated{" "}
              <b>city penthouses</b>, tranquil <b>rural getaways</b>, and even{" "}
              <b>fully crewed yachts</b> for those seeking a maritime adventure.
            </div>
            <br />
            <div className={styles.content}>
              Beyond our prowess in luxury holiday villa rentals, we excel in
              sourcing exceptional properties that transcend the ordinary,
              catering to diverse needs such as{" "}
              <b>corporate gatherings, film and television productions</b> for{" "}
              <b>advertising campaigns</b>, magazine <b>photo shoots</b> and
              exclusive <b>product launches</b>. Our offers extend to premium
              accommodations tailored to meet your preferences or those of your
              clients.
            </div>
            <br />
            <div className={styles.content}>
              Julian Ginailhac, the visionary behind Cocoon Luxury Properties,
              draws from over a decade of immersed experience in the realm of
              luxury holiday villa rentals. His understanding of both the host`s
              perspective, having rented out homes himself, and the guest`s
              standpoint, underscores our commitment to delivering an{" "}
              <b>unparalleled hospitality experience.</b>
            </div>
          </div>
          <div className={styles.right}>
            <Image
              src="/aboutUsPage/aboutus1.png"
              className={styles.firstBanner}
            />
          </div>
        </div>

        <div className={styles.properties}>
          <div className={styles.left}>
            <Image
              src="/aboutUsPage/aboutus2.png"
              className={styles.secondBanner}
            />
          </div>
          <div className={styles.right}>
            <h4> Mission</h4>
            <Divider />
            <div className={styles.content}>
              At Cocoon Luxury Properties we specialise in finding inspired and
              amazing properties for corporate events, film and TV shows and
              advertisements, magazine shoots, product launches, plus premium
              accommodation for you or your clients.
            </div>
          </div>
        </div>

        <div className={styles.location}>
          <div className={styles.left}>
            <h4>Location</h4>
            <Divider />
            <div className={styles.content}>
              We’ve handpicked beautiful properties perfect for holiday/guest
              accommodation or running any corporate function; from a conference
              to a product launch or end-of-year party. We match amazing
              properties from waterfront homes, beach houses, city penthouses,
              rural escapes or fully crewed boats and super yachts with the
              needs of our clients.
            </div>
          </div>
          <div className={styles.right}>
            <Image
              src="/aboutUsPage/aboutus3.png"
              className={styles.thirdBanner}
            />
          </div>
        </div>

        <div className={styles.benefit}>
          <h4>BENEFITS</h4>
          <div className={styles.sub}>
            We cater to professionals in corporate, entertainment, media and
            general holiday makers or professionals relocating.
          </div>

          <div className={styles.benefitDetail}>
            <div className={styles.item}>
              <Image src="/aboutUsPage/benefitIcon.svg" />
              <span>Our properties are immaculately clean</span>
            </div>
            <div className={styles.item}>
              <Image src="/aboutUsPage/benefitIcon.svg" />
              <span>
                We can provide catering and extra cleaning and transport if
                required, just ask.
              </span>
            </div>
            <div className={styles.item}>
              <Image src="/aboutUsPage/benefitIcon.svg" />
              <span>
                Renting a property for your corporate event is as cost effective
                as renting conference facilities at a major hotel.
              </span>
            </div>
            <div className={styles.item}>
              <Image src="/aboutUsPage/benefitIcon.svg" />
              <span>
                Our properties create a unique, memorable and intimate
                experience.
              </span>
            </div>
          </div>
        </div>
      </div>

      <Service />
      <CocoonInstagram />
    </div>
  );
};

export default AboutUsPage;
