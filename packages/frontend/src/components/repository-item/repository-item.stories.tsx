import React from "react";
import { storiesOf } from "@storybook/react";
import { RepositoryItem } from "./repository-item";
import { baseRepoWithInstallation } from "../../testing/data";

storiesOf("repository-item", module)
.add("default", () => (
  <RepositoryItem repository={baseRepoWithInstallation} />
));
