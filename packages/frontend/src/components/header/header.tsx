import React, { useCallback } from "react";
import { Icon } from "semantic-ui-react";
import { dispatcher } from "../../action-creator";

import * as styles from "./header.css";
import { LINKS } from "../../consts";

type Props = {
};

export const Header: React.FC<Props> = () => {
  const handleOnLogout = useCallback((e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatcher.logout();
  }, []);
  return (
    <div className={styles.header}>
      <nav>
        <a className={styles.brandLogo} href={LINKS.organization} />
      </nav>
      <a href={LINKS.configureInstallations}>Configure</a>
      <a href="#" onClick={handleOnLogout}>Logout</a>
      <a href={LINKS.ghAppRepository}>
        <Icon name="github" size="big" />
      </a>
    </div>
  );
};
