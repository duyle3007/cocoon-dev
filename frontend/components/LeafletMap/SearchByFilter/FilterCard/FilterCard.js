import Slideshow from "@/components/pages/HomePage/Slideshow/Slideshow";
import { Button } from "antd";
import Link from "next/link";

import styles from "./FilterCard.module.scss";

const FilterCard = ({ villa }) => {
  return (
    <div className={styles.filterCard}>
      <Link href={`properties/${villa.slug}`}>
        <Slideshow
          data={villa.images.map((image) => image.src)}
          className={styles.slider}
          cardMode
          dots={true}
        />
        <div className={styles.content}>
          <div>
            <div className={styles.headline}>
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{
                  __html: villa?.title?.rendered,
                }}
              />
              {villa.categories && (
                <div className={styles.tag}>
                  {villa.categories[0].id === 12
                    ? "HOLIDAYS"
                    : "PHOTOSHOOTS / EVENTS"}
                </div>
              )}
            </div>

            <div className={styles.hotelDetail}>
              <div className={styles.infoWrapper}>
                <div className={styles.info}>
                  <img src="/homepage/discoverIcon.svg" />
                  <span>
                    {villa.acf.country},{villa.acf.location1}
                  </span>
                </div>
                <div className={styles.info}>
                  <img src="/map/bedIcon.svg" />
                  {villa.acf.no_of_bedrooms || 0} bedrooms
                </div>
                <div className={styles.info}>
                  <img src="/map/bathIcon.svg" />
                  {villa.acf.no_of_bathrooms || 0} bathrooms
                </div>
                <div className={styles.info}>
                  <img src="/map/peopleIcon.svg" />
                  {villa.acf.guests || 0} peoples
                </div>
              </div>
              {villa.acf.description ? (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: villa?.acf?.description,
                  }}
                />
              ) : null}
            </div>

            <div className="flex justify-between items-center gap-4 mt-2">
              <div className={styles.priceWrapper}>
                {villa.acf.starting_price ? (
                  <div className={styles.price}>
                    AU${villa.acf.starting_price}
                  </div>
                ) : (
                  "..."
                )}
                <span> /NIGHT</span>
              </div>
              <Button className={styles.viewBtn}>VIEW DETAILS</Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FilterCard;
