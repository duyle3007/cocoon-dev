import { Button, DatePicker, Dropdown, Input, Select } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import styles from "./SearchBanner.module.scss";
import Link from "next/link";
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

const GuestDropdown = ({ onUpdateGuest }) => {
  const [numAdult, setNumAdult] = useState(0);
  const [numChildren, setNumChildren] = useState(0);

  useEffect(() => {
    if (numAdult > 0 || numChildren > 0) {
      onUpdateGuest(`${numAdult} adults, ${numChildren} children`);
    } else {
      onUpdateGuest(null);
    }
  }, [numAdult, numChildren]);

  const onDecrease = (value, setValue) => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <div className={styles.guestDropdown}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {numAdult}
          <span>Adults</span>
        </div>
        <div className={styles.plusMinus}>
          <div
            className={styles.minusIcon}
            onClick={() => onDecrease(numAdult, setNumAdult)}
          >
            <MinusOutlined />
          </div>
          <div
            className={styles.plusIcon}
            onClick={() => setNumAdult((state) => state + 1)}
          >
            <PlusOutlined />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {numChildren}
          <span>Children</span>
        </div>
        <div className={styles.plusMinus}>
          <div
            className={styles.minusIcon}
            onClick={() => onDecrease(numChildren, setNumChildren)}
          >
            <MinusOutlined />
          </div>
          <div
            className={styles.plusIcon}
            onClick={() => setNumChildren((state) => state + 1)}
          >
            <PlusOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
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
