import { Button, DatePicker, Dropdown, Select } from "antd";
import { useState } from "react";

import Link from "next/link";
import Image from "@/components/Image/Image";
import GuestDropdown from "./GuestDropdown/GuestDropdown";
import { isMobile } from "@/utils/utils";

import styles from "./SearchBanner.module.scss";

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
  const [guestNumber, setGuestNumber] = useState();

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

  const onUpdateGuest = (selectedGuest) => {
    setGuestNumber(selectedGuest);
  };

  if (isMobile()) {
    return (
      <Link href="/search" className={styles.searchMobile}>
        <Button className={styles.searchBtn}>SEARCH</Button>
      </Link>
    );
  }
  return (
    <div className={styles.searchBanner}>
      <div className={styles.searchItem}>
        <div className={styles.title}>LOCATION</div>
        <Select
          placeholder="Choose a destination"
          bordered={false}
          options={DESTINATION_LIST}
        />
      </div>
      <div className={styles.searchItem}>
        <div className={styles.title}>CHECK IN</div>
        <DatePicker
          format="MMM DD, YYYY"
          disabledDate={disabledStartDate}
          bordered={false}
          onChange={onChangeStartDay}
          placeholder="Arrive"
        />
      </div>
      <div className={styles.searchItem}>
        <div className={styles.title}>CHECK OUT</div>
        <DatePicker
          disabledDate={disabledEndDate}
          format="MMM DD, YYYY"
          bordered={false}
          onChange={onChangeEndDay}
          placeholder="Depart"
        />
      </div>
      <div className={styles.searchItem}>
        <div className={styles.title}>GUEST</div>
        <div className={styles.guestDropdownWrapper}>
          <Image src="/map/peopleIcon.svg" />
          <Dropdown
            placement="bottom"
            dropdownRender={() => (
              <GuestDropdown onUpdateGuest={onUpdateGuest} />
            )}
            arrow
          >
            <div className={styles.guestValue}>
              {guestNumber?.length > 0 ? guestNumber : "Guest"}
            </div>
          </Dropdown>
        </div>
      </div>
      <Link href="/search" className="mx-auto">
        <Button className={styles.searchBtn}>SEARCH</Button>
      </Link>
    </div>
  );
};

export default SearchBanner;
