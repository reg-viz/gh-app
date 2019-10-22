import React, { useCallback } from "react";
import cx from "classnames";
import { dispatcher } from "../../action-creator";

import * as styles from "./search-form.css";
import { SearchIcon } from "./search-icon";

type Props = {
  className?: string;
  searchText: string;
};

export const SearchForm: React.FC<Props> = ({ searchText, className }) => {
  const handleOnChange= useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher.changeSearchText(e.target.value);
  }, []);

  return (
    <div className={cx(className, styles.searchForm)}>
      <SearchIcon className={styles.icon} />
      <input
        className={styles.input}
        type="search"
        placeholder="Search on repository or owner"
        onChange={handleOnChange}
        value={searchText}
      />
    </div>
  );
};
