import { configure, addDecorator, addParameters } from "@storybook/react";
import { withScreenshot } from "storycap";

const req = require.context("../src", true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
addDecorator(withScreenshot);
addParameters({
  screenshot: {
    delay: 100,
    viewport: {
      width: 1024,
      height: 768,
    },
  },
});
