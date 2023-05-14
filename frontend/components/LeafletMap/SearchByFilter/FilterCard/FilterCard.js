import Slideshow from "@/components/pages/HomePage/Slideshow/Slideshow";
import { Button } from "antd";
import Link from "next/link";

import styles from "./FilterCard.module.scss";

const FilterCard = ({ villa }) => {
  return (
    <div className={styles.filterCard}>
      <Slideshow
        data={villa.url}
        className={styles.slider}
        cardMode
        dots={true}
      />
      <div className={styles.content}>
        <div className={styles.headline}>
          <div className={styles.title}>{villa.name}</div>
          {villa.type && <div className={styles.tag}>{villa.type}</div>}
        </div>

        <div className="flex flex-col h-[88px]">
          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <img src="/homepage/discoverIcon.svg" />
              <span>{villa.location}</span>
            </div>
            <div className={styles.info}>
              <img src="/map/bedIcon.svg" />
              {villa.numBedroom || 0} bedrooms
            </div>
            <div className={styles.info}>
              <img src="/map/bathIcon.svg" />
              {villa.numBathroom || 0} bathrooms
            </div>
            <div className={styles.info}>
              <img src="/map/peopleIcon.svg" />
              {villa.numPeople || 0} peoples
            </div>
          </div>
          {villa.description ? (
            <div className={styles.description}>{villa.description}</div>
          ) : null}
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className={styles.priceWrapper}>
            {villa.price ? (
              <div className={styles.price}>AU${villa.price}</div>
            ) : (
              "..."
            )}
            <span> /NIGHT</span>
          </div>
          <Link href={`properties${villa.destinationUrl}` || "/properties"}>
            <Button className={styles.viewBtn}>VIEW DETAILS</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
