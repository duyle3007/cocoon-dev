import { Form, Select } from "antd";
import { useEffect } from "react";

import { getCountryList } from "@/utils/utils";

import styles from "./CountrySelect.module.scss";

const { Option } = Select;

const CountrySelect = () => {
  const countryList = getCountryList();
  const formRef = Form.useFormInstance();

  useEffect(() => {
    formRef.setFieldsValue({ country: "Andorra" });
  }, []);

  return (
    <Select
      defaultValue={"Andorra"}
      getPopupContainer={(trigger) => trigger}
      popupMatchSelectWidth={false}
      className={`${styles.countrySelect}`}
      showSearch
      onChange={(value) => formRef.setFieldsValue({ country: value })}
    >
      {Object.keys(countryList).map(function (key) {
        const country = countryList[key];
        return (
          <Option
            key={country.name}
            value={country.name}
            className="flex items-center"
          >
            <span className="opacity-75">{country.name}</span>
          </Option>
        );
      })}
    </Select>
  );
};

export default CountrySelect;
