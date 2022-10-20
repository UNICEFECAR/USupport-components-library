import React from "react";

import { CheckBoxSelector } from "./CheckBoxSelector";

export default {
  title: "Components Library/inputs/CheckBoxSelector",
  component: CheckBoxSelector,
  argTypes: {},
};

const Template = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <CheckBoxSelector
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      label={"User's answer 2"}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
