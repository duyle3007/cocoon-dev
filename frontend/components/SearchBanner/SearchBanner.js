import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./SearchBanner.module.scss";
import SelectWithPrefix from "../SelectWithPrefix/SelectWithPrefix";

const { Option } = Select;

const SearchBanner = () => {
  return (
    <div className={styles.searchBanner}>
      <Input
        type="search"
        placeholder="Enter keyword"
        prefix={<SearchOutlined />}
        className={styles.input}
      />
      <div className={styles.title}>LOCATION</div>
      <SelectWithPrefix
        prefix={<SearchOutlined />}
        placeholder="Choose a destination"
      />
      <Button>SEARCH</Button>
    </div>
  );
};

export default SearchBanner;
