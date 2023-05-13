import { Divider } from "antd";

import Image from "@/components/Image/Image";
import Service from "./Service/Service";
import CocoonInstagram from "../HomePage/CocoonInstagram/CocoonInstagram";

import styles from "./AboutUsPage.module.scss";

const AboutUsPage = () => {
  return (
    <div className={styles.aboutUsPage}>
      <div className={styles.upperIntro}>
        <div className={styles.properties}>
          <div className={styles.left}>
            <h4> Cocoon Luxury Properties</h4>
            <Divider />
            <div className={styles.content}>
              Cocoon Luxury Properties offers our guest and clients handpicked
              luxury five star properties perfect for holiday accommodation. We
              have a superb collection of luxury properties from waterfront
              homes, beach houses, city penthouses, rural escapes or fully
              crewed boats and super yachts.
            </div>
            <div className={styles.content}>
              We also specialise in finding inspired and amazing properties for
              corporate events, film and TV shows and advertisements, magazine
              shoots, product launches, plus premium accommodation for you or
              your clients.
            </div>
            <div className={styles.content}>
              The owner, Julian Ginailhac has a background in luxury holidays
              villa rental for more than a decade. He appreciates what it means
              as an owner to rent out homes and also as a guest to stay in them.
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
              Our properties are immaculately clean
            </div>
            <div className={styles.item}>
              <Image src="/aboutUsPage/benefitIcon.svg" />
              We can provide catering and extra cleaning and transport if
              required, just ask.
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
              Our properties create a unique, memorable and intimate experience.
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
