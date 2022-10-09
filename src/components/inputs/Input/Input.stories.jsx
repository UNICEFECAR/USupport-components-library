import React from "react";

import { Input } from "./Input";

export default {
  title: "Components Library/inputs/Input",
  component: Input,
  argTypes: {},
};

const Template = (props) => <Input placeholder={"Placeholder"} {...props} />;

export const Default = Template.bind({});
Default.args = {
  label: "Input",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Input",
  errorMessage: "Error message",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Input",
  disabled: true,
};
