import React from "react";

import { RadioButtonSelectorGroup } from "./RadioButtonSelectorGroup";

export default {
  title: "Components Library/inputs/RadioButtonSelectorGroup",
  component: RadioButtonSelectorGroup,
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
    <RadioButtonSelectorGroup
      name={"name"}
      options={options}
      selected={selected}
      setSelected={setSelected}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
