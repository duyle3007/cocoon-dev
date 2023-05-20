import { HeartOutlined } from "@ant-design/icons";
import Image from "@/components/Image/Image";

import styles from "./PropertyIntro.module.scss";

const PropertyIntro = ({ info }) => {
  return (
    <div className={styles.propertyIntro}>
      <div className="flex justify-between">
        <div className={styles.propertyLocation}>{info.location}</div>
        <HeartOutlined />
      </div>
      <div className={styles.nameAndPrice}>
        <div className={styles.name}>{info.name}</div>
        <div className={styles.price}>
          <h6 className="text-[#90744F] leading-8 flex items-center text-[28px] font-bold tracking-wider">
            AU${info.price}
          </h6>
          / NIGHT
        </div>
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.roomItem}>
          <Image src="/map/bedIcon.svg" className={styles.roomIcon} />
          <span>{info.numBedrooms} bedrooms</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/bathIcon.svg" className={styles.roomIcon} />
          <span>{info.numBadrooms} badthroom</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/peopleIcon.svg" className={styles.roomIcon} />
          <span>{info.numSleep} sleeps</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/moonIcon.svg" className={styles.roomIcon} />
          <span>Min {info.minNight} nights</span>
        </div>
      </div>

      <div className={styles.description}>{info.description}</div>
    </div>
  );
};

export default PropertyIntro;
