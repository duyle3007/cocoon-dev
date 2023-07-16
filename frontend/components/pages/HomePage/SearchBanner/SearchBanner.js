import { Button, Cascader, DatePicker, Dropdown } from "antd";
import { useContext, useMemo, useState } from "react";

import Link from "next/link";
import Image from "@/components/Image/Image";
import GuestDropdown from "./GuestDropdown/GuestDropdown";
import { isMobile } from "@/utils/utils";
import { DESTINATION_LIST } from "@/components/Header/Header";
import { PropertyListContext } from "@/components/Layout/Layout";

import styles from "./SearchBanner.module.scss";

const SearchBanner = () => {
  const { allLocation } = useContext(PropertyListContext);

  const [guestNumber, setGuestNumber] = useState();
  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);
  const [destination, setDestination] = useState(null);

  const searchValue = useMemo(() => {
    if (destination?.length === 1) {
      return `country=${destination}`;
    } else if (destination?.length === 2) {
      return `location1=${destination.join(",")}`;
    } else if (destination?.length === 3) {
      return `location2=${destination.join(",")}`;
    }
    return "";
  }, [destination]);

  const maxGuest = useMemo(() => {
    const totalGuest = guestNumber
      ?.split(" ")
      .reduce((a, c) => a + (Number(c) || 0), 0);

    return totalGuest;
  }, [guestNumber]);
  const disabledEndDate = (current) => {
    return momentStartDate ? current && current < momentStartDate : false;
  };

  const disabledStartDate = (current) => {
    return momentEndDate ? current && current > momentEndDate : false;
  };

  const onChangeStartDay = (date) => {
    setMomentStartDate(date);

    // Auto focus on check out calendar
    if (date) {
      const checkOutCalendar = document.getElementsByClassName("ant-picker")[1];
      checkOutCalendar.click();
    }
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
        <Cascader
          popupClassName={styles.selectPrefix}
          bordered={false}
          value={destination}
          displayRender={(labels) => {
            return labels[labels.length - 1];
          }}
          placeholder="Choose a destination"
          options={DESTINATION_LIST}
          onChange={(value) => {
            setDestination(value);
          }}
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
      <Link
        href={`/search?${searchValue}${
          guestNumber ? `&guest=${maxGuest}` : ""
        }${momentStartDate ? `&startDate=${momentStartDate}` : ""}${
          momentEndDate ? `&endDate=${momentEndDate}` : ""
        }`}
        className="mx-auto"
      >
        <Button className={styles.searchBtn}>SEARCH</Button>
      </Link>
    </div>
  );
};

export default SearchBanner;
