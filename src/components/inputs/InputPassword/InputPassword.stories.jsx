import React from "react";

import { InputPassword } from "./InputPassword";

export default {
  title: "Components Library/inputs/InputPassword",
  component: InputPassword,
  argTypes: {},
};

const Template = (props) => <InputPassword {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  errorMessage: "Error message",
};
