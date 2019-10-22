import * as React from "react";
import cx from "classnames";
import { RepositoryWithInstallation } from "../../types";
import { ClientIdModal } from "../client-id-modal";
import { RoundButton } from "../round-button/round-button";
import * as styles from "./repository-item.css";

type Props = {
  className?: string;
  repository: RepositoryWithInstallation;
};

export const RepositoryItem: React.FC<Props> = ({ className, repository: { name, owner, id, installation, clientId } })=> (
  <li className={cx(className, styles.repositoryItem)}>
    <div className={styles.repoInfo}>
      <img className={styles.avatar} src={owner.avatarUrl} alt={owner.login} />
      <div className={styles.repoInfoNames}>
        <div className={styles.repoName}>{name}</div>
        <div className={styles.ownerName}>{owner.login}</div>
      </div>
    </div>
    <ClientIdModal
      repositoryName={name}
      clientId={clientId}
      trigger={({ open }) => <button onClick={open} className={styles.triggerButton}>Get Client ID</button>}
    />
  </li>
);
