import { DatePicker, Form } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { isMobile } from "@/utils/utils";

import styles from "./RangeDatePicker.module.scss";

const RangeDatePicker = ({ value, onSelect, disabledDates }) => {
  const formRef = Form.useFormInstance();
  const router = useRouter();

  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);

  disabledDates?.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  let previousBookedEndDate;
  const disabledStartDatePicker = (current) => {
    const currentDate = dayjs(current).format("YYYY-MM-DD");
    dayjs(current).format("YYYY-MM-DD");
    if (disabledDates) {
      const isBookedDate = disabledDates.some((disabledDate) => {
        // Allow book half day
        previousBookedEndDate = disabledDate.endDate;

        if (
          previousBookedEndDate &&
          previousBookedEndDate === disabledDate.startDate
        ) {
          return true;
        }
        if (currentDate === dayjs(disabledDate.endDate).format("YYYY-MM-DD")) {
          return false;
        }
        if (
          dayjs(disabledDate.startDate).format("YYYY-MM-DD") <= currentDate &&
          currentDate <= dayjs(disabledDate.endDate).format("YYYY-MM-DD")
        ) {
          return true;
        }
        return false;
      });
      if (isBookedDate) {
        return isBookedDate;
      }
    }
    if (momentEndDate && current <= momentEndDate && disabledDates) {
      // Check if range selected date is match with booked dates
      // Three condition:
      // - Calendar day item must smaller than selected end date
      // - Range booked day must smaller than selected end date (other range booked day larger than selected end date is ignored)
      // - Then we select the first range booked day that match condition 2, all day which is smaller than that range will be disabled
      return disabledDates.some(
        (disabledDate) =>
          dayjs(disabledDate.endDate).format("YYYY-MM-DD") <
            dayjs(momentEndDate).format("YYYY-MM-DD") &&
          currentDate < dayjs(disabledDate.endDate).format("YYYY-MM-DD")
      );
    }
    return momentEndDate ? current && current > momentEndDate : false;
  };

  let previousBookedStartDate;
  const disabledEndDatePicker = (current) => {
    const currentDate = dayjs(current).format("YYYY-MM-DD");
    dayjs(current).format("YYYY-MM-DD");

    if (disabledDates) {
      const isBookedDate = disabledDates.some((disabledDate) => {
        // Allow book half day
        previousBookedStartDate = disabledDate.startDate;
        if (dayjs(momentStartDate).format("YYYY-MM-DD") === currentDate) {
          return true;
        }
        if (
          previousBookedStartDate &&
          previousBookedStartDate === disabledDate.endDate
        ) {
          return true;
        }
        if (
          currentDate === dayjs(disabledDate.startDate).format("YYYY-MM-DD")
        ) {
          return false;
        }

        if (
          dayjs(disabledDate.startDate).format("YYYY-MM-DD") <= currentDate &&
          currentDate <= dayjs(disabledDate.endDate).format("YYYY-MM-DD")
        ) {
          return true;
        }
        return false;
      });
      if (isBookedDate) {
        return isBookedDate;
      }
    }
    if (momentStartDate && current >= momentStartDate && disabledDates) {
      // Check if range selected date is match with bookedDate
      // Three condition:
      // - Calendar day item must larger than selected start date
      // - Range booked day must larger than selected start date (other range booked day previous selected start date is ignored)
      // - Then we select the first range booked day that match condition 2, all day which larger than that range will be disabled
      return disabledDates.some(
        (disabledDate) =>
          dayjs(disabledDate.startDate).format("YYYY-MM-DD") >
            dayjs(momentStartDate).format("YYYY-MM-DD") &&
          currentDate > dayjs(disabledDate.startDate).format("YYYY-MM-DD")
      );
    }
    return momentStartDate ? current && current < momentStartDate : false;
  };

  useEffect(() => {
    if (momentStartDate && momentEndDate) {
      onSelect && onSelect([momentStartDate, momentEndDate]);

      // If this component is controlled by form
      if (value) {
        formRef.setFieldsValue({ rangeDate: [momentStartDate, momentEndDate] });
        !isMobile() && formRef.submit();
      }
    }
  }, [momentStartDate, momentEndDate]);

  useEffect(() => {
    if (value) {
      setMomentStartDate(value[0]);
      setMomentEndDate(value[1]);
    }
  }, [value]);

  const onChangeStartDay = (date) => {
    setMomentStartDate(date);

    // Auto focus on check out calendar
    if (date && !momentEndDate) {
      // because in mobile, the Check out picker render 2 version (desktop and mobile), while desktop only have one
      // so the picker have been duplicated
      const checkOutCalendar =
        isMobile() && router.pathname !== "/properties/[name]"
          ? document.getElementsByClassName("ant-picker")[3]
          : document.getElementsByClassName("ant-picker")[1];
      checkOutCalendar.click();
    }

    // If this component is controlled by form
    if (value) {
      formRef.setFieldsValue({ rangeDate: [date, value[1]] });
    }
  };

  const onChangeEndDay = (date) => {
    setMomentEndDate(date);

    // If this component is controlled by form
    if (value) {
      formRef.setFieldsValue({ rangeDate: [value[0], date] });
    }
  };
  return (
    <div className={styles.rangeDatePicker}>
      <div className="flex flex-col w-full">
        <div className={styles.title}>CHECK IN</div>
        <DatePicker
          format="MMM DD, YYYY"
          disabledDate={disabledStartDatePicker}
          onChange={onChangeStartDay}
          value={momentStartDate}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className={styles.title}>CHECK OUT</div>
        <DatePicker
          disabledDate={disabledEndDatePicker}
          format="MMM DD, YYYY"
          onChange={onChangeEndDay}
          value={momentEndDate}
        />
      </div>
    </div>
  );
};

export default RangeDatePicker;
