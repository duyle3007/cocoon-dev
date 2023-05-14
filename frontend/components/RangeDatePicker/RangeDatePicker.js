import { DatePicker } from "antd";
import { useEffect, useState } from "react";

import styles from "./RangeDatePicker.module.scss";
import moment from "moment";

const RangeDatePicker = ({ onSelect }) => {
  const [momentStartDate, setMomentStartDate] = useState(null);
  const [momentEndDate, setMomentEndDate] = useState(null);

  const disabledEndDate = (current) => {
    return momentStartDate ? current && current < momentStartDate : false;
  };

  const disabledStartDate = (current) => {
    return momentEndDate ? current && current > momentEndDate : false;
  };

  useEffect(() => {
    if (momentStartDate && momentEndDate && onSelect) {
      onSelect([momentStartDate, momentEndDate]);
    }
  }, [momentStartDate, momentEndDate, onSelect]);

  const onChangeStartDay = (date) => {
    setMomentStartDate(date);
  };

  const onChangeEndDay = (date) => {
    setMomentEndDate(date);
  };
  return (
    <div className={styles.rangeDatePicker}>
      <div className="flex flex-col w-full">
        <div className={styles.title}>CHECK IN</div>
        <DatePicker
          format="MMM DD, YYYY"
          disabledDate={disabledStartDate}
          onChange={onChangeStartDay}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className={styles.title}>CHECK OUT</div>
        <DatePicker
          disabledDate={disabledEndDate}
          format="MMM DD, YYYY"
          onChange={onChangeEndDay}
        />
      </div>
    </div>
  );
};

export default RangeDatePicker;
