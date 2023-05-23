import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SelectWithPrefix from "@/components/SelectWithPrefix/SelectWithPrefix";

import styles from "./MapControl.module.scss";
import { isMobile } from "@/utils/utils";
import Image from "@/components/Image/Image";

export const COUNTRY_LIST = [
  {
    name: "All destinations",
    value: "all",
  },
  {
    name: "Australia",
    value: "australia",
  },
  {
    name: "New Zealand",
    value: "new_zealand",
  },
  {
    name: "Bali",
    value: "bali",
  },
  {
    name: "Thailand",
    value: "thai",
  },
  {
    name: "France",
    value: "france",
  },
  {
    name: "Italy",
    value: "italy",
  },
  {
    name: "Greece",
    value: "greece",
  },
];

const MapControl = ({
  searchType,
  onChangeSearchType,
  listLocation,
  onOpenFilter,
  onOpenSort,
}) => {
  const router = useRouter();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (router.query.destination) {
      setDestination(router.query.destination);
    } else {
      setDestination(null);
    }
  }, [router]);

  return (
    <div className={styles.mapControl}>
      {isMobile() ? (
        <div className="flex flex-col w-full">
          <div className={styles.searchMobile} onClick={onOpenFilter}>
            <Image src="/searchPage/whiteLocation.svg" className="mr-3" />
            <span>
              {COUNTRY_LIST.find((country) => country.value === destination)
                ?.name || "Choose  destination"}
            </span>
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
              <Image
                src="/searchPage/sort.svg"
                className={styles.sortIcon}
                onClick={onOpenSort}
              />
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
            options={COUNTRY_LIST}
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
