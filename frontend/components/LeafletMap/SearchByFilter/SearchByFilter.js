import { useState } from "react";
import { Form, Select } from "antd";

import FilterCard from "./FilterCard/FilterCard";

import styles from "./SearchByFilter.module.scss";
import { isMobile } from "@/utils/utils";

export const SORT_VALUES = [
  { value: "price:asc", label: "Price: Low to high" },
  { value: "price:desc", label: "Price: High to low" },
  { value: "date:desc", label: "Date: New to old" },
  { value: "date:asc", label: "Date: Old to new" },
];

const SearchByFilter = ({ listLocation, mode }) => {
  const formRef = Form.useFormInstance();

  return (
    <div
      className={`${styles.searchByFilter} ${
        mode === "photoshoot" && styles.photoshootPage
      }`}
    >
      {isMobile() && mode && (
        <div className={styles.resultNumMobile}>
          {listLocation.length} PROPERTIES
        </div>
      )}
      <div className={styles.headResult}>
        <div className="text-xs gap-1">{listLocation.length} PROPERTIES</div>

        <div className="text-xs gap-1 flex items-center opacity-80 cursor-pointer text-[#404040]">
          SORT BY:
          <Form.Item name="sort">
            <Select
              className={styles.sortSelect}
              bordered={false}
              options={SORT_VALUES}
              suffixIcon={<img src="/searchPage/sort.svg" />}
            />
          </Form.Item>
        </div>
      </div>

      <div className={styles.filterResult}>
        {listLocation.length > 0 &&
          listLocation.map((location, index) => (
            <FilterCard villa={location} key={index} />
          ))}
      </div>
    </div>
  );
};

export default SearchByFilter;
