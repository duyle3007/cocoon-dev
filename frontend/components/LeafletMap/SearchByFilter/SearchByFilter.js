import { useState } from "react";

import styles from "./SearchByFilter.module.scss";

const SearchByFilter = ({ listLocation }) => {
  const [sortValue, setSortValue] = useState("RELEVANCE");

  return (
    <div className={styles.searchByFilter}>
      <div className="flex w-full justify-between items-center mb-[25px] h-fit">
        <div className="text-xs gap-1">{listLocation.length} PROPERTIES</div>

        <div className="text-xs gap-4 flex items-center opacity-80 cursor-pointer text-[#404040]">
          SORT BY: {sortValue}
          <img src="/searchPage/sort.svg" />
        </div>
      </div>
    </div>
  );
};

export default SearchByFilter;
