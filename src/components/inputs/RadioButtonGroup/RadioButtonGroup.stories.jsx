import React from "react";

import { RadioButtonGroup } from "./RadioButtonGroup";

export default {
  title: "Components Library/inputs/RadioButtonGroup",
  component: RadioButtonGroup,
  argTypes: {},
};

const options = [
  { label: "Coding", value: "coding" },
  { label: "Music", value: "music" },
  { label: "Games", value: "games" },
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
