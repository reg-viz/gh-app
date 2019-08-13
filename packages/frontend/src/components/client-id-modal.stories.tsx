import React from "react";
import { storiesOf } from "@storybook/react";

import { ClientIdModal } from "./client-id-modal";

storiesOf("client-id-modal", module).add("default", () => (
  <ClientIdModal
    repositoryName="gh-app"
    clientId="zxcvbnm213456=="
    open
  />
));
