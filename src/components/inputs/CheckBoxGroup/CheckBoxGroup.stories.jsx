import React from "react";

import { CheckBoxGroup } from "./CheckBoxGroup";

export default {
  title: "Components Library/inputs/CheckBoxGroup",
  component: CheckBoxGroup,
  argTypes: {},
};

const Template = (props) => {
  const [options, setOptions] = React.useState([
    { label: "Coding", value: "coding", isSelected: false },
    { label: "Music", value: "music", isSelected: false },
    { label: "Games", value: "games", isSelected: false },
  ]);

  return (
    <CheckBoxGroup
      name={"name"}
      options={options}
      setOptions={setOptions}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Hobbies",
};
