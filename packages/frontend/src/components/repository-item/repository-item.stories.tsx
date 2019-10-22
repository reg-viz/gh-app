import React from "react";
import { storiesOf } from "@storybook/react";
import { RepositoryItem } from "./repository-item";
import { baseRepoWithInstallation } from "../../testing/data";
import * as styles from "./repository-item.css";

storiesOf("repository-item", module)
.add("default", () => (
  <RepositoryItem repository={baseRepoWithInstallation} />
), {
  screenshot: {
    variants: {
      focus: {
        focus: `.${styles.triggerButton}`,
      },
      hover: {
        hover: `.${styles.triggerButton}`,
      },
    },
  },
});
