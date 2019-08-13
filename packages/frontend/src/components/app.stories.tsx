import React from "react";
import { storiesOf } from "@storybook/react";

import { AppComponent } from "./app";
import {
  baseInstallationWithRepos,
  createRepositoies,
} from "../testing/data";

storiesOf("app", module)
.add("loading", () => (
  <AppComponent
    isLoading
    installations={[]}
    repositories={[]}
    searchText=""
  />
))
.add("without installations", () => (
  <AppComponent
    isLoading={false}
    installations={[]}
    repositories={[]}
    searchText=""
  />
))
.add("with installations", () => (
  <AppComponent
    isLoading={false}
    installations={[baseInstallationWithRepos]}
    repositories={createRepositoies(3)}
    searchText="reg-su"
  />
))
;
