import Image from "../Image/Image";
import styles from "./HotelCard.module.scss";

const HotelCard = ({ item, className }) => {
  return (
    <div className={`${styles.hotelCard} ${className}`}>
      <div className={styles.info}>
        <div className={styles.name}>{item?.name}</div>
        <div className={styles.priceAndLocation}>
          <div className="flex gap-2 items-center">
            <Image src="/homepage/dollarIcon.svg" />
            <div>
              {item?.price}
              <span> / night</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Image src="/homepage/mapIcon.svg" />
            {item?.location}
          </div>
        </div>
      </div>
      <div className={styles.thumbnailContainer}>
        <img src={item?.thumbnailUrl} className={styles.thumbnail} />
      </div>
    </div>
  );
};

export default HotelCard;
