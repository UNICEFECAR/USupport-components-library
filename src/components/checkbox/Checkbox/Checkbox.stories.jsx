import React from "react";

import { Checkbox } from "./Checkbox";

export default {
  title: "Components Library/checkbox/Checkbox",
  component: Checkbox,
  argTypes: {},
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CheckBoxWithLabel = Template.bind({});
CheckBoxWithLabel.args = {
  text: "label",
};
