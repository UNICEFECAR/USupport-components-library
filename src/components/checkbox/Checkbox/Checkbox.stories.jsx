import React from "react";

import { Checkbox } from "./Checkbox";

export default {
  title: "Components Library/checkbox/Checkbox",
  component: Checkbox,
  argTypes: {},
};

const Template = (args) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const CheckBoxWithLabel = Template.bind({});
CheckBoxWithLabel.args = {
  text: "label",
};
