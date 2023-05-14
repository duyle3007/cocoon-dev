import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SelectWithPrefix from "@/components/SelectWithPrefix/SelectWithPrefix";

import styles from "./MapControl.module.scss";

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

const MapControl = ({ searchType, onChangeSearchType }) => {
  const router = useRouter();

  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (router.query.destination) {
      setDestination(router.query.destination);
    }
  }, [router]);

  return (
    <div className={styles.mapControl}>
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
          className={`${styles.info} ${searchType === "map" && styles.active}`}
          onClick={() => onChangeSearchType("map")}
        >
          <img src="/searchPage/map.svg" />
          MAP
        </div>
      </div>
    </div>
  );
};

export default MapControl;
