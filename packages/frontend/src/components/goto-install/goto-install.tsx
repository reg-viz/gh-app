import React from "react";
import { Icon } from "semantic-ui-react";
import * as styles from "./goto-install.css";
import { LINKS } from "../../consts";

export const GotoInstall = () => {
  return (
    <div className={styles.root}>
      <Icon name="download" size="massive" />
      <p className={styles.description}>
        Please install <a className="text-link" href={LINKS.configureInstallations}>reg-suit GitHub app</a>. <br />
        reg-suit app notifies results of regression tests to your repository.
      </p>
    </div>
  );
};
