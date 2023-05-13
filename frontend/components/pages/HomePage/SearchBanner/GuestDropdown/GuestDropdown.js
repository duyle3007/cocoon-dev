import { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./GuestDropdown.module.scss";

const GuestDropdown = ({ onUpdateGuest, className }) => {
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
    <div className={`${styles.guestDropdown} ${className}`}>
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

export default GuestDropdown;
