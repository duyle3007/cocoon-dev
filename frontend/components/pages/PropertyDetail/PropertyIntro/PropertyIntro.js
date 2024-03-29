import Image from "@/components/Image/Image";

import styles from "./PropertyIntro.module.scss";
import { isMobile } from "@/utils/utils";

const PropertyIntro = ({ info }) => {
  return (
    <div className={styles.propertyIntro}>
      <div className="flex justify-between">
        <div className={styles.propertyLocation}>{info?.acf.location1}</div>
        {!isMobile() && (
          <div className={styles.price}>
            <h6 className="text-[#90744F] leading-8 flex items-center text-[28px] font-bold tracking-wider">
              AU${info?.acf.starting_price}
            </h6>
            / NIGHT
          </div>
        )}
      </div>
      <div className={styles.nameAndPrice}>
        <div
          className={styles.name}
          dangerouslySetInnerHTML={{ __html: info?.title?.rendered }}
        />
        {isMobile() && (
          <div className={styles.price}>
            <h6 className="text-[#90744F] leading-8 flex items-center text-[28px] font-bold tracking-wider">
              AU${info?.acf.starting_price}
            </h6>
            / NIGHT
          </div>
        )}
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.roomItem}>
          <Image src="/map/bedIcon.svg" className={styles.roomIcon} />
          <span>{info?.acf.no_of_bedrooms} bedrooms</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/bathIcon.svg" className={styles.roomIcon} />
          <span>{info?.acf.no_of_bathrooms} bathroom</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/peopleIcon.svg" className={styles.roomIcon} />
          <span>{info?.acf.guests} sleeps</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/moonIcon.svg" className={styles.roomIcon} />
          <span>Min {info?.acf.min_of_nights} nights</span>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.tagLine}>{info?.acf.tag_line}</div>
        <div dangerouslySetInnerHTML={{ __html: info?.acf.description }} />
      </div>
    </div>
  );
};

export default PropertyIntro;
