import { Button, DatePicker, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import SelectWithPrefix from "../SelectWithPrefix/SelectWithPrefix";

import styles from "./SearchBanner.module.scss";
import { useState } from "react";

const TAB_VALUES = {
  HOLIDAY: "holiday",
  PHOTOSHOOT: "photoshoot",
};
const SearchBanner = () => {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.HOLIDAY);
  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);

  const disabledEndDate = (current) => {
    return momentStartDate ? current && current < momentStartDate : false;
  };

  const disabledStartDate = (current) => {
    return momentEndDate ? current && current > momentEndDate : false;
  };

  const onChangeStartDay = (date) => {
    setMomentStartDate(date);
  };

  const onChangeEndDay = (date) => {
    setMomentEndDate(date);
  };

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
          prefix={<SearchOutlined />}
          className={styles.input}
        />
        <div className={styles.title}>LOCATION</div>
        <SelectWithPrefix
          prefix={<img src="/homepage/discoverIcon.svg" />}
          placeholder="Choose a destination"
        />
        <div className="flex gap-4">
          <div className="flex flex-col">
            <div className={styles.title}>CHECK IN</div>
            <DatePicker
              format="MMM DD,YYYY"
              disabledDate={disabledStartDate}
              onChange={onChangeStartDay}
            />
          </div>

          <div className="flex flex-col">
            <div className={styles.title}>CHECK OUT</div>
            <DatePicker
              disabledDate={disabledEndDate}
              onChange={onChangeEndDay}
            />
          </div>
        </div>
        <Button>SEARCH</Button>
      </div>
    </div>
  );
};

export default SearchBanner;
