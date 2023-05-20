import { useState } from "react";
import { Select } from "antd";

import FilterCard from "./FilterCard/FilterCard";

import styles from "./SearchByFilter.module.scss";
import { isMobile } from "@/utils/utils";

const SearchByFilter = ({ listLocation, mode }) => {
  const [sortValue, setSortValue] = useState("RELEVANCE");

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
          <Select
            className={styles.sortSelect}
            defaultValue="relevance"
            bordered={false}
            options={[
              { value: "relevance", label: "Relevance" },
              { value: "price:asc", label: "Price: Low to high" },
              { value: "price:des", label: "Price: High to low" },
              { value: "date:des", label: "Date: New to old" },
              { value: "date:asc", label: "Date: Old to new" },
              { value: "popular", label: "Popular" },
            ]}
            suffixIcon={<img src="/searchPage/sort.svg" />}
          />
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
