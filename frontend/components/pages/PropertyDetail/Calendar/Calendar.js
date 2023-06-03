import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import dynamic from "next/dynamic";
const ReactCalendar = dynamic(() => import("react-calendar"), { ssr: false });

import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";

import styles from "./Calendar.module.scss";

const Calendar = ({ info }) => {
  const [monthFirstCalendar, setMonthFirstCalendar] = useState(
    moment().toDate()
  );
  const [monthSecondCalendar, setMonthSecondCalendar] = useState(
    moment().add(1, "M").toDate()
  );
  const [totalPrice, setTotalPrice] = useState("0.00");
  const disableRangeStart = new Date("2023-05-10");
  const disableRangeEnd = new Date("2023-05-16");
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const disabledDays = document.querySelectorAll(
        ".react-calendar__tile[disabled]"
      );
      if (disabledDays.length) {
        disabledDays[0].classList.add(styles.firstDateDisabled);
        disabledDays[disabledDays.length - 1].classList.add(
          styles.lastDateDisabled
        );
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

  const onSelectRangeData = (selectedRangeDate) => {
    setSelectedDates(selectedRangeDate);
  };

  const onPrevCalendar = () => {
    setMonthFirstCalendar(moment(monthFirstCalendar).subtract(1, "M").toDate());
    setMonthSecondCalendar(
      moment(monthSecondCalendar).subtract(1, "M").toDate()
    );
  };

  const onNextCalendar = () => {
    setMonthFirstCalendar(moment(monthFirstCalendar).add(1, "M").toDate());
    setMonthSecondCalendar(moment(monthSecondCalendar).add(1, "M").toDate());
  };

  console.log("selectedDates", selectedDates);
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
        <div className={styles.doubleCalendar}>
          <ReactCalendar
            activeStartDate={monthFirstCalendar}
            value={selectedDates}
            tileDisabled={tileDisabled}
            prevLabel={
              <LeftOutlined
                className={styles.leftArrowCalendar}
                onClick={onPrevCalendar}
              />
            }
            prev2Label={null}
            next2Label={null}
            nextLabel={
              <RightOutlined
                className={styles.leftArrowCalendar}
                onClick={onNextCalendar}
              />
            }
            locale="en"
            showNeighboringMonth={false}
          />
          <ReactCalendar
            activeStartDate={monthSecondCalendar}
            tileDisabled={tileDisabled}
            value={selectedDates}
            prevLabel={
              <LeftOutlined
                className={styles.leftArrowCalendar}
                onClick={onPrevCalendar}
              />
            }
            prev2Label={null}
            next2Label={null}
            nextLabel={
              <RightOutlined
                className={styles.leftArrowCalendar}
                onClick={onNextCalendar}
              />
            }
            locale="en"
            showNeighboringMonth={false}
          />
        </div>
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
          <Link
            href={`/enquiry?propertyId=${
              info.id
            }&startDate=${selectedDates[0]?.format(
              "DD-MM-YYYY"
            )}&endDate=${moment(selectedDates[1])?.format("DD-MM-YYYY")}`}
            className="flex flex-col"
          >
            <Button className={styles.enquiryButton}>GO TO ENQUIRY FORM</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
