import React from "react";

import { Toggle } from "./Toggle";

export default {
  title: "Components Library/inputs/Toggle",
  component: Toggle,
  argTypes: {},
};

const Template = (props) => {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <Toggle
      isToggled={isSelected}
      setParentState={(val) => setIsSelected(val)}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
