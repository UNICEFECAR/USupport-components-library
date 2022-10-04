import React from "react";

import { Label } from "./Label";

export default {
  title: "Components Library/labels/Label",
  component: Label,
  argTypes: {},
};

const Template = (args) => <Label text={"Text 1"} {...props} />;

export const Default = Template.bind({});
Default.args = {};
