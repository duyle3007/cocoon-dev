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
        <div>
          At Cocoon Luxury Properties we specialise in renting luxury homes in
          Australia. We have an inspired collection of properties for vacations,
          photoshoots, and company events. We pride ourselves on providing a
          tailor-made experience.
        </div>
        <div>Our motto is to “Create Memories”, </div>
        let us be the architects of these memories!
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
