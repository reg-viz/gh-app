import React from "react";
import { storiesOf } from "@storybook/react";
import * as styles from "./app.css";

import { AppComponent } from "./app";
import {
  baseInstallationWithRepos,
  createRepositoies,
} from "../../testing/data";

storiesOf("app", module)
.add("default", () => (
  <AppComponent
    isLoading={false}
    installations={[baseInstallationWithRepos]}
    repositories={createRepositoies(3)}
    searchText="reg-su"
  />
), {
  screenshot: {
    viewports: {
      desktop: {
        width: 1024,
        height: 768,
      },
      tablet: "iPad Mini",
      mobile: "iPhone X",
    },
    variants: {
      configureFocus: {
        focus: `.${styles.guide} > a`,
      },
      configureHover: {
        hover: `.${styles.guide} > a`,
      },
    },
  },
})
.add("loading", () => (
  <AppComponent
    isLoading
    installations={[]}
    repositories={[]}
    searchText=""
  />
))
.add("no installations", () => (
  <AppComponent
    isLoading={false}
    installations={[]}
    repositories={[]}
    searchText=""
  />
))
;
