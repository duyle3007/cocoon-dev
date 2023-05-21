import { useRouter } from "next/router";

import Image from "../Image/Image";

import styles from "./HotelCard.module.scss";

const HotelCard = ({ item, className }) => {
  const router = useRouter();

  return (
    <div
      className={`${styles.hotelCard} ${className}`}
      onClick={() => router.push(`/properties/${item?.slug}`)}
    >
      <div className={styles.info}>
        <div
          className={styles.name}
          dangerouslySetInnerHTML={{ __html: item?.title?.rendered }}
        ></div>
        <div className={styles.priceAndLocation}>
          <div className="flex gap-2 items-center">
            <Image src="/homepage/dollarIcon.svg" />
            <div>
              {item?.acf?.starting_price}
              <span> / night</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Image src="/homepage/mapIcon.svg" />
            {item?.acf?.country}
          </div>
        </div>
      </div>
      <div className={styles.thumbnailContainer}>
        <img
          src={item?.images && item?.images[0]?.src}
          className={styles.thumbnail}
        />
      </div>
    </div>
  );
};

export default HotelCard;
