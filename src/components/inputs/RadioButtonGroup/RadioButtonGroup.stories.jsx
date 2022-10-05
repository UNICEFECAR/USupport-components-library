import React from "react";

import { RadioButtonGroup } from "./RadioButtonGroup";

export default {
  title: "Components Library/inputs/RadioButtonGroup",
  component: RadioButtonGroup,
  argTypes: {},
};

const options = [
  { lable: "Under 18", value: "under18" },
  { lable: "Between 18 and 25", value: "under25" },
  { lable: "Above 25", value: "above25" },
];

const Template = (props) => {
  const [selected, setSelected] = React.useState("");

  return (
    <RadioButtonGroup
      name="ageGroup"
      options={options}
      selected={selected}
      setSelected={setSelected}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
