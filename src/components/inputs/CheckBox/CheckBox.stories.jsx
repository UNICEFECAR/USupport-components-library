import React from "react";

import { CheckBox } from "./CheckBox";

export default {
  title: "Components Library/inputs/CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} {...props} />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const CheckBoxWithLabel = Template.bind({});
CheckBoxWithLabel.args = {
  label: "label",
};
