import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import dynamic from "next/dynamic";
const ReactCalendar = dynamic(() => import("react-calendar"), { ssr: false });

import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";

import styles from "./Calendar.module.scss";
import moment from "moment";

const Calendar = () => {
  const [totalPrice, setTotalPrice] = useState("0.00");
  const disableRangeStart = new Date("2023-05-10");
  const disableRangeEnd = new Date("2023-05-20");
  const [selectedDates, setSelectedDates] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const disabledDays = document.querySelectorAll(
        ".react-calendar__tile[disabled]"
      );
      console.log("disabledDays", disabledDays);
      if (disabledDays.length) {
        disabledDays[0].classList.add(styles.firstDisabled);
      }
    }
  });

  const isDateInRange = (date, startDate, endDate) => {
    const formatDate = moment(date).format("YYYY-MM-DD");
    const formatStartDate = moment(startDate).format("YYYY-MM-DD");
    const formatEndDate = moment(endDate).format("YYYY-MM-DD");

    return formatDate >= formatStartDate && formatDate <= formatEndDate;
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return isDateInRange(date, disableRangeStart, disableRangeEnd);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && selectedDates) {
      if (isDateInRange(date, disableRangeStart, disableRangeEnd)) {
        console.log("hello", date);
        return styles.disable;
      }
    }
  };

  const onSelectRangeData = (selectedRangeDate) => {
    setSelectedDates(selectedRangeDate);
  };

  return (
    <div className={styles.calendar}>
      <h1>Calendar</h1>
      <div className={styles.mainView}>
        <div className={styles.calendarNote}>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-white border-[#E8E8E8] border-[1px]" />
            <div className={styles.note}>AVAILABLE DATES</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-[#E8E8E8]" />
            <div className={styles.note}>BOOKED DATES</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 bg-[#90744F]" />
            <div className={styles.note}>SELECTED DATES</div>
          </div>
        </div>
        <ReactCalendar
          showDoubleView
          value={selectedDates}
          tileDisabled={tileDisabled}
          prevLabel={<LeftOutlined className={styles.leftArrowCalendar} />}
          prev2Label={null}
          next2Label={null}
          nextLabel={<RightOutlined className={styles.leftArrowCalendar} />}
          locale="en"
          tileClassName={tileClassName}
        />
        <div className={styles.chooseDate}>
          <RangeDatePicker onSelect={onSelectRangeData} />
          <div className={styles.priceTotal}>
            <div className="flex justify-between px-4 py-2">
              <span>PRICE</span>
              <span>TOTAL</span>
            </div>
            <div className="flex justify-between px-4 bg-[#F2EEE8] py-2">
              <span>Total</span>
              <span>{totalPrice} AUD</span>
            </div>
          </div>
          <Link href="/enquiry" className="flex flex-col">
            <Button className={styles.enquiryButton}>GO TO ENQUIRY FORM</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
