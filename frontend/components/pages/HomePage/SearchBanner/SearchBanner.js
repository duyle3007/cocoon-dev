import { Button, DatePicker, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

import SelectWithPrefix from "../../../SelectWithPrefix/SelectWithPrefix";

import styles from "./SearchBanner.module.scss";
import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";

const TAB_VALUES = {
  HOLIDAY: "holiday",
  PHOTOSHOOT: "photoshoot",
};

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

const SearchBanner = () => {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.HOLIDAY);

  return (
    <div className={styles.searchBanner}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            activeTab === TAB_VALUES.HOLIDAY && styles.tabActive
          }`}
          onClick={() => setActiveTab(TAB_VALUES.HOLIDAY)}
        >
          HOLIDAY
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === TAB_VALUES.PHOTOSHOOT && styles.tabActive
          }`}
          onClick={() => setActiveTab(TAB_VALUES.PHOTOSHOOT)}
        >
          PHOTOSHOOTS/EVENTS
        </div>
      </div>
      <div className={styles.tabContent}>
        <Input
          type="search"
          placeholder="Enter keyword"
          prefix={<img src="/homepage/searchIcon.svg" />}
          className={styles.input}
        />
        <div className={styles.title}>LOCATION</div>
        <SelectWithPrefix
          prefix={<img src="/homepage/discoverIcon.svg" />}
          placeholder="Choose a destination"
          options={DESTINATION_LIST}
        />
        <RangeDatePicker />
        <Button className={styles.searchBtn}>SEARCH</Button>
      </div>
    </div>
  );
};

export default SearchBanner;
