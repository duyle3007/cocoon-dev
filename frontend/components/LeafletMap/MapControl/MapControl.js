import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SelectWithPrefix from "@/components/SelectWithPrefix/SelectWithPrefix";

import styles from "./MapControl.module.scss";
import { isMobile } from "@/utils/utils";
import Image from "@/components/Image/Image";

const DESTINATION_LIST = [
  {
    name: "All destinations",
    value: "all",
  },
  {
    name: "Australia",
    value: "australia",
  },
  {
    name: "France",
    value: "france",
  },
  {
    name: "Egypt",
    value: "egypt",
  },
];

const MapControl = ({ searchType, onChangeSearchType, listLocation }) => {
  const router = useRouter();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (router.query.destination) {
      setDestination(router.query.destination);
    }
  }, [router]);

  return (
    <div className={styles.mapControl}>
      {isMobile() ? (
        <div className="flex flex-col w-full">
          <div className={styles.searchMobile}>
            <Image src="/searchPage/whiteLocation.svg" className="mr-3" />
            <span>{destination || "Choose  destination"}</span>
            <Image
              src="/searchPage/filterMobile.svg"
              className="right-4"
              style={{ position: "absolute" }}
            />
          </div>
          <div className={styles.underSearchMobile}>
            <div className={styles.properties}>
              {listLocation.length} PROPERTIES
            </div>
            <div className={styles.searchType}>
              <div
                className={`${styles.info} ${
                  searchType === "filter" && styles.active
                }`}
                onClick={() => onChangeSearchType("filter")}
              >
                <img src="/searchPage/filter.svg" />
                LIST
              </div>

              <div
                className={`${styles.info} ${
                  searchType === "map" && styles.active
                }`}
                onClick={() => onChangeSearchType("map")}
              >
                <img src="/searchPage/map.svg" />
                MAP
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <SelectWithPrefix
            className={styles.selectPrefix}
            value={destination}
            prefix={<img src="/homepage/discoverIcon.svg" />}
            placeholder="Choose a destination"
            options={DESTINATION_LIST}
            onChange={(value) => setDestination(value)}
          />
          <div className={styles.searchType}>
            <div
              className={`${styles.info} ${
                searchType === "filter" && styles.active
              }`}
              onClick={() => onChangeSearchType("filter")}
            >
              <img src="/searchPage/filter.svg" />
              FILTER
            </div>

            <div
              className={`${styles.info} ${
                searchType === "map" && styles.active
              }`}
              onClick={() => onChangeSearchType("map")}
            >
              <img src="/searchPage/map.svg" />
              MAP
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapControl;
