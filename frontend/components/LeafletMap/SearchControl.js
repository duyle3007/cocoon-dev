import { Input } from "antd";

const { Search } = Input;
const SearchControl = ({ onSearch }) => {
  return (
    <div>
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
