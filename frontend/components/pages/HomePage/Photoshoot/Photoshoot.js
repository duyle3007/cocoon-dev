import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext } from "react";

import HotelCard from "../../../HotelCard/HotelCard";
import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./Photoshoot.module.scss";

const Photoshoot = () => {
  const { propertyList } = useContext(PropertyListContext);
  const holidayList = propertyList.filter(
    (property) => property.categories[0].name === "Events"
  );

  return (
    <div className={styles.holidayContainer}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div>PHOTOSHOOTS</div>
          <div>Only Available for Photoshoots, Filming and TV Production.</div>
        </div>
        <Link href="/photoshoots">
          <div className={styles.rightHeader}>
            CHECK ALL
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      </div>

      <div className={styles.listHotel}>
        {holidayList.length > 0 &&
          holidayList
            .slice(0, 3)
            .map((hotel, index) => (
              <HotelCard item={hotel} key={index} className={styles.hotel} />
            ))}
      </div>

      <Link href="/photoshoots">
        <div className={styles.checkAll}>
          CHECK ALL
          <span>
            <ArrowRightOutlined />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Photoshoot;
