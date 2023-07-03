import { useState } from "react";
import { Button, notification } from "antd";
import { useRouter } from "next/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";
import dynamic from "next/dynamic";
const ReactCalendar = dynamic(() => import("react-calendar"), { ssr: false });

import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";

import styles from "./Calendar.module.scss";

const Calendar = ({ info }) => {
  const router = useRouter();
  const [monthFirstCalendar, setMonthFirstCalendar] = useState(
    moment().toDate()
  );
  const [monthSecondCalendar, setMonthSecondCalendar] = useState(
    moment().add(1, "M").toDate()
  );
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [selectedDates, setSelectedDates] = useState([]);

  const isDateInRange = (date) => {
    const formatDate = moment(date).format("YYYY-MM-DD");
    return info.bookedDates.some(
      (bookedDate) =>
        formatDate >= bookedDate.startDate && formatDate <= bookedDate.endDate
    );
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return isDateInRange(date);
    }
  };

  const tileClassName = ({ date }) => {
    const currentDate = moment(date).format("YYYY-MM-DD");
    let className = "";
    info.bookedDates.forEach((bookedDate) => {
      if (currentDate === bookedDate.startDate) {
        className = styles.startDateDisabled;
      }
      if (currentDate === bookedDate.endDate) {
        className = styles.endDateDisabled;
      }
    });
    return className;
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

  const goToBooking = () => {
    if (selectedDates.length > 0) {
      router.push(
        `/enquiry?propertyId=${info.id}&startDate=${selectedDates[0]}&endDate=${selectedDates[1]}`
      );
    } else {
      notification.error({
        message: "Please select checkin/checkout date first",
      });
    }
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
        <div className={styles.doubleCalendar}>
          <ReactCalendar
            activeStartDate={monthFirstCalendar}
            value={selectedDates}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
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
            tileClassName={tileClassName}
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
          <RangeDatePicker
            onSelect={onSelectRangeData}
            disabledDates={info.bookedDates}
          />
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
          <div className="flex flex-col">
            <Button className={styles.enquiryButton} onClick={goToBooking}>
              GO TO ENQUIRY FORM
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
