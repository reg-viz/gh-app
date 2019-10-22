import React from "react";
import { storiesOf } from "@storybook/react";
import { SearchForm } from "./search-form";

storiesOf("search-form", module)
.add("default", () => <SearchForm searchText="" />)
.add("fulfilled", () => <SearchForm searchText="reg-suit" />)
;
