import { HeartOutlined } from "@ant-design/icons";

import styles from "./PropertyIntro.module.scss";
import Image from "@/components/Image/Image";

const PropertyIntro = ({ info }) => {
  return (
    <div className={styles.propertyIntro}>
      <div className="flex justify-between">
        <div className="text-base uppercase opacity-70 tracking-wider">
          {info.location}
        </div>
        <HeartOutlined />
      </div>
      <div className="flex justify-between mt-2">
        <div className={styles.name}>{info.name}</div>
        <div className="flex items-end gap-1 ">
          <h6 className="text-[#90744F] leading-8 flex items-center text-[28px] font-bold tracking-wider">
            AU${info.price}
          </h6>
          / NIGHT
        </div>
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.roomItem}>
          <Image src="/map/bedIcon.svg" />
          <span>{info.numBedrooms} bedrooms</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/bathIcon.svg" />
          <span>{info.numBadrooms} badthroom</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/map/peopleIcon.svg" />
          <span>{info.numSleep} sleeps</span>
        </div>
        <div className={styles.roomItem}>
          <Image src="/moonIcon.svg" />
          <span>Min {info.minNight} nights</span>
        </div>
      </div>

      <div className={styles.description}>{info.description}</div>
    </div>
  );
};

export default PropertyIntro;
