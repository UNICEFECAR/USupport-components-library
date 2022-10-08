import React from "react";

import { RadioButton } from "./RadioButton";

export default {
  title: "Components Library/inputs/RadioButton",
  component: RadioButton,
  argTypes: {},
};

const Template = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <div>
      <RadioButton
        {...props}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const RadioButtonWithText = Template.bind({});
RadioButtonWithText.args = {
  label: "Radio Button",
};
