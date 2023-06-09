import { Select, Cascader } from "antd";

import styles from "./SelectWithPrefix.module.scss";

const { Option } = Select;

const SelectWithPrefix = ({
  options = [],
  prefix,
  className,
  multipleLevel,
  value,
  onChange,
  ...props
}) => {
  const displayRender = (labels) => {
    return labels[labels.length - 1];
  };

  return (
    <div className={`${styles.selectPrefix} ${className && className}`}>
      {prefix && prefix}
      {multipleLevel ? (
        <Cascader
          value={value}
          placeholder={"Select"}
          bordered={false}
          options={options}
          displayRender={displayRender}
          removeIcon={null}
          onChange={onChange}
          getPopupContainer={(node) => node}
          suffixIcon={<img src="/homepage/arrow-down.svg" />}
          {...props}
        />
      ) : (
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
      )}
    </div>
  );
};

export default SelectWithPrefix;
