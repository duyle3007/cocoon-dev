import { Input } from "antd";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./SearchControl.module.scss";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";

const SearchControl = ({
  onSearch,
  listLocation,
  onClick,
  handleReinitClick,
  searchType,
}) => {
  const [tabActive, setTabActive] = useState("holiday");
  const [isMinimized, setIsMinimized] = useState(false);

  const onMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      handleReinitClick();
    }, 200);
  };

  const onMaximize = () => {
    setIsMinimized(false);
    setTimeout(() => {
      handleReinitClick();
    }, 200);
  };

  return (
    <>
      <div
        className={`${styles.searchControl} ${
          isMinimized ? styles.minimized : ""
        }`}
      >
        <div className={styles.topSearch}>
          <div className={styles.tabBar}>
            <div
              className={`${styles.tab} ${
                tabActive === "holiday" && styles.active
              }`}
              onClick={() => setTabActive("holiday")}
            >
              HOLIDAYS
            </div>
            <div
              className={`${styles.tab} ${
                tabActive === "photo" && styles.active
              }`}
              onClick={() => setTabActive("photo")}
            >
              PHOTOSHOOTS/EVENTS
            </div>
            <LeftOutlined onClick={onMinimize} />
          </div>
        </div>
        {searchType === "filter" ? (
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                type="search"
                placeholder="Villa name or location"
                prefix={<img src="/homepage/searchIcon.svg" />}
                className={styles.input}
                onChange={onSearch}
              />
              <RangeDatePicker />
            </div>
          </div>
        ) : (
          <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                type="search"
                placeholder="Villa name or location"
                prefix={<img src="/homepage/searchIcon.svg" />}
                className={styles.input}
                onChange={onSearch}
              />
            </div>
            <div className={styles.numResult}>
              {listLocation.length} PROPERTIES
            </div>
            <div className={styles.searchResultList}>
              {listLocation.map((location, index) => {
                return (
                  <div
                    className={styles.locationCard}
                    key={index}
                    onClick={() => onClick(location.lat, location.lng)}
                  >
                    <img src="/map/marker.svg" />
                    <div className={styles.locationContent}>
                      <div>{location.name}</div>
                      <div className={styles.priceWrapper}>
                        <div className={styles.price}>AU${location.price}</div>
                        {location?.oldPrice && (
                          <div className={styles.discountPrice}>
                            AU${location.oldPrice}
                          </div>
                        )}
                        <span> /NIGHT</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {isMinimized && (
        <div className={styles.rightArrow} onClick={onMaximize}>
          <RightOutlined />
        </div>
      )}
    </>
  );
};

export default SearchControl;
