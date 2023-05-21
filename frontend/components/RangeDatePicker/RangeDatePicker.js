import { DatePicker, Form } from "antd";
import { useEffect, useState } from "react";

import styles from "./RangeDatePicker.module.scss";

const RangeDatePicker = ({ value, onSelect }) => {
  const formRef = Form.useFormInstance();

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

      // If this component is controlled by form
      if (value) {
        formRef.setFieldsValue({ rangeDate: [momentStartDate, momentEndDate] });
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
          disabledDate={disabledStartDate}
          onChange={onChangeStartDay}
          value={momentStartDate}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className={styles.title}>CHECK OUT</div>
        <DatePicker
          disabledDate={disabledEndDate}
          format="MMM DD, YYYY"
          onChange={onChangeEndDay}
          value={momentEndDate}
        />
      </div>
    </div>
  );
};

export default RangeDatePicker;
