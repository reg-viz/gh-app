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
      <a className={styles.textLink} href={LINKS.configureInstallations}>Configure</a>
      <a className={styles.textLink} href="#" onClick={handleOnLogout}>Logout</a>
      <a className={styles.iconLink} href={LINKS.ghAppRepository}>
        <Icon name="github" size="big" />
      </a>
    </div>
  );
};
