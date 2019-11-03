import * as React from "react";
import cx from "classnames";
import { RepositoryWithInstallation } from "../../types";
import { RepositoryItem } from "../repository-item";
import * as styles from "./repository-list.css";

type Props = {
  repositories: RepositoryWithInstallation[];
  className?: string;
};

export const RepositoryList: React.FC<Props> = ({ className, repositories }: Props) => {
  return (
    <ul className={cx(className)}>
      {repositories.filter(r => !r.hidden).map(r => (
        <RepositoryItem className={styles.item} key={r.id} repository={r} />
      ))}
    </ul>
  );
}
