import React from "react";

import { CheckBoxSelectorGroup } from "./CheckBoxSelectorGroup";

export default {
  title: "Components Library/inputs/CheckBoxSelectorGroup",
  component: CheckBoxSelectorGroup,
  argTypes: {},
};

const Template = (props) => {
  const [options, setOptions] = React.useState([
    { label: "Coding", value: "coding", isSelected: false },
    { label: "Music", value: "music", isSelected: false },
    { label: "Games", value: "games", isSelected: false },
  ]);

  return (
    <CheckBoxSelectorGroup
      name={"name"}
      options={options}
      setOptions={setOptions}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
