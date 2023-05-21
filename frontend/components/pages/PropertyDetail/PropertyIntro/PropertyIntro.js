import { HeartOutlined } from "@ant-design/icons";
import Image from "@/components/Image/Image";

import styles from "./PropertyIntro.module.scss";

const PropertyIntro = ({ info }) => {
  return (
    <div className={styles.propertyIntro}>
      <div className="flex justify-between">
        <div className={styles.propertyLocation}>{info.acf.location1}</div>
        <HeartOutlined />
      </div>
      <div className={styles.nameAndPrice}>
        <div
          className={styles.name}
          dangerouslySetInnerHTML={{ __html: info?.title?.rendered }}
        />
        <div className={styles.price}>
          <h6 className="text-[#90744F] leading-8 flex items-center text-[28px] font-bold tracking-wider">
            AU${info.acf.starting_price}
          </h6>
          / NIGHT
        </div>
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.roomItem}>
          <Image src="/map/bedIcon.svg" className={styles.roomIcon} />
          <span>{info.acf.no_of_bedrooms} bedrooms</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/bathIcon.svg" className={styles.roomIcon} />
          <span>{info.acf.no_of_bathrooms} badthroom</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/peopleIcon.svg" className={styles.roomIcon} />
          <span>{info.acf.guests} sleeps</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/moonIcon.svg" className={styles.roomIcon} />
          <span>Min {info.acf.min_of_nights} nights</span>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.tagLine}>{info.acf.tag_line}</div>
        {info.acf.description}
      </div>
    </div>
  );
};

export default PropertyIntro;
