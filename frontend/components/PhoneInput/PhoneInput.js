import { Form, InputNumber, Select } from "antd";
import { useState } from "react";

import { getCountryList } from "@/utils/utils";

import styles from "./PhoneInput.module.scss";

const { Option } = Select;

const PhoneInput = ({ className }) => {
  const formRef = Form.useFormInstance();
  const countryList = getCountryList();

  const [countryPhone, setCountryPhone] = useState("61");

  const PhoneAddon = () => {
    return (
      <Select
        value={countryPhone}
        showSearch
        className={styles.phoneSelect}
        getPopupContainer={(trigger) => trigger}
        popupMatchSelectWidth={false}
        onChange={(value) => setCountryPhone(value)}
      >
        {Object.keys(countryList).map(function (key) {
          const country = countryList[key];
          return (
            <Option
              key={country.name}
              value={country.phone}
              className="flex items-center"
            >
              {`${country.emoji} +`}
              <span className="opacity-75">{country.phone}</span>
            </Option>
          );
        })}
      </Select>
    );
  };

  return (
    <InputNumber
      addonBefore={<PhoneAddon />}
      controls={false}
      placeholder="Input your phone"
      className={`${styles.phoneSelect} ${className}`}
      onChange={(value) =>
        formRef.setFieldsValue({ phoneNumber: `+${countryPhone} ${value}` })
      }
    />
  );
};

export default PhoneInput;
