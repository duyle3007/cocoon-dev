import { Button } from "antd";
import { isMobile } from "@/utils/utils";
import Link from "next/link";

import styles from "./Headline.module.scss";

const Headline = () => {
  return (
    <div className={styles.headline}>
      {isMobile() && (
        <div className={styles.title}>COCOON LUXURY PROPERTIES</div>
      )}
      <div className={styles.leftHeadline}>
        <p>
          You will find here a selection of highly desirable villas in Australia
          and around the World. These properties have been carefully selected
          for their exceptional features.
        </p>
        <p>
          Cocoon Luxury Properties specialises in renting luxury homes that
          provide the perfect <strong>Cocoon</strong> for your family and
          friends to live unforgettable moments and holidays.
        </p>
        <p>
          We pride ourselves on providing tailor-made experiences and on being
          the architects of your next memories. Contact us now to find the
          unique property that fit your needs.
        </p>
      </div>

      <div className={styles.rightHeadline}>
        {!isMobile() && (
          <div className={styles.title}>COCOON LUXURY PROPERTIES</div>
        )}
        <Link href="/about-us">
          <Button>ABOUT US</Button>
        </Link>
      </div>
    </div>
  );
};

export default Headline;
