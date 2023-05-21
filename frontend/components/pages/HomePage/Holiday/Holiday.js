import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext, useMemo } from "react";
import { PropertyListContext } from "@/components/Layout/Layout";

import HotelCard from "../../../HotelCard/HotelCard";
import { isMobile } from "@/utils/utils";

import styles from "./Holiday.module.scss";

const Holiday = () => {
  const { propertyList } = useContext(PropertyListContext);
  const holidayList = propertyList.filter(
    (property) => property.categories[0].name === "Holiday"
  );

  return (
    <div className={styles.holidayContainer}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div>Holiday</div>
          <div>All activities are allowed.</div>
        </div>
        <Link href="/holiday">
          <div className={styles.rightHeader}>
            CHECK ALL
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      </div>

      <div className={styles.listHotel}>
        {holidayList.length > 0 && isMobile()
          ? holidayList
              .slice(0, 3)
              .map((hotel, index) => (
                <HotelCard key={index} item={hotel} className={styles.hotel} />
              ))
          : holidayList.map((hotel, index) => (
              <HotelCard key={index} item={hotel} className={styles.hotel} />
            ))}
      </div>
      {isMobile() && (
        <Link href="/holiday">
          <div className={styles.checkAll}>
            CHECK ALL
            <span>
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Holiday;
