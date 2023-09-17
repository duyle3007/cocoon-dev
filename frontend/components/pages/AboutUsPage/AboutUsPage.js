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
              Cocoon Luxury Properties presents a curated selection of exquisite
              five-star properties, meticulously chosen to provide our guests
              with the ultimate luxury holiday experience.
            </div>
            <div className={styles.content}>
              Our portfolio boasts an exceptional array of opulent
              accommodations, ranging from picturesque waterfront estates and
              charming beachfront houses to sophisticated city penthouses,
              tranquil rural getaways, and even fully crewed yachts for those
              seeking a maritime adventure.
            </div>
            <div className={styles.content}>
              Beyond our prowess in luxury holiday villa rentals, we excel in
              sourcing exceptional properties that transcend the ordinary,
              catering to diverse needs such as corporate gatherings, film and
              television productions for advertising campaigns, magazine photo
              shoots and exclusive product launches. Our offers extend to
              premium accommodations tailored to meet your preferences or those
              of your clients.
            </div>
            <div className={styles.content}>
              Julian Ginailhac, the visionary behind Cocoon Luxury Properties,
              draws from over a decade of immersed experience in the realm of
              luxury holiday villa rentals. His understanding of both the host`s
              perspective, having rented out homes himself, and the guest`s
              standpoint, underscores our commitment to delivering an
              unparalleled hospitality experience.
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
