import React from "react";

import { InputSearch } from "./InputSearch";

export default {
  title: "Components Library/inputs/InputSearch",
  component: InputSearch,
  argTypes: {},
};

function onChange(value) {
  console.log(value);
}

const Template = (args) => <InputSearch placeholder={"Search"} {...props} />;

export const Default = Template.bind({});
Default.args = {
  onChange: onChange,
};
