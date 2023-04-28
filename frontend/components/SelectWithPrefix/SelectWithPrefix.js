import { Select } from "antd";

import styles from "./SelectWithPrefix.module.scss";

const { Option } = Select;

const SelectWithPrefix = ({ options = [], prefix, className, ...props }) => {
  return (
    <div className={`${styles.selectPrefix} ${className && className}`}>
      {prefix && prefix}
      <Select
        showSearch
        placeholder={"Select"}
        bordered={false}
        suffixIcon={<img src="/homepage/arrow-down.svg" />}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
      >
        {options.map((option) => (
          <Option value={option.value} key={option.value}>
            {option.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectWithPrefix;
