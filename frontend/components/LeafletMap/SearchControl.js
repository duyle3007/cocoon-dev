import { Input } from "antd";

import styles from "./SearchControl.module.scss";

const { Search } = Input;
const SearchControl = ({ onSearch }) => {
  return (
    <div className={styles.searchControl}>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchControl;
