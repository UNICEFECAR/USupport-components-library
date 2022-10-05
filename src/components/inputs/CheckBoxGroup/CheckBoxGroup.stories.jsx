import React from "react";

import { CheckBoxGroup } from "./CheckBoxGroup";

export default {
  title: "Components Library/inputs/CheckBoxGroup",
  component: CheckBoxGroup,
  argTypes: {},
};

const Template = (props) => {
  const [options, setOptions] = React.useState([
    { lable: "Coding", value: "coding", isSelected: false },
    { lable: "Music", value: "music", isSelected: false },
    { lable: "Games", value: "games", isSelected: false },
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
