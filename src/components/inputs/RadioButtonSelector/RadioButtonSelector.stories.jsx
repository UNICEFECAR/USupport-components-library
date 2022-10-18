import React from "react";

import { RadioButtonSelector } from "./RadioButtonSelector";

export default {
  title: "Components Library/inputs/RadioButtonSelector",
  component: RadioButtonSelector,
  argTypes: {},
};

const Template = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <RadioButtonSelector
      label={"User's answer 2"}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
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
