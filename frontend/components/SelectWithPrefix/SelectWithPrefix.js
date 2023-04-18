import { Select } from "antd";

import styles from "./SelectWithPrefix.module.scss";

const SelectWithPrefix = ({ options = [], prefix, ...props }) => {
  return (
    <div className={styles.selectPrefix}>
      {prefix && prefix}
      <Select
        showSearch
        placeholder={"Select"}
        bordered={false}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
      >
        {options.map((option) => (
          <Option value={option.value}>{option.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectWithPrefix;
