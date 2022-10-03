import React from "react";

import { TabsUnderlined } from "./TabsUnderlined";

export default {
  title: "Components Library/tabs/TabsUnderlined",
  component: TabsUnderlined,
  argTypes: {},
};

const Template = (args) => {
  const [options, setOptions] = React.useState([
    { label: "Adolescence", isSelected: false },
    { label: "Parental panel", isSelected: false },
  ]);

  const handleOnPress = (index) => {
    const optionsCopy = [...options];

    for (let i = 0; i < optionsCopy.length; i++) {
      if (i === index) {
        optionsCopy[i].isSelected = true;
      } else {
        optionsCopy[i].isSelected = false;
      }
    }

    setOptions(optionsCopy);
  };

  return (
    <TabsUnderlined options={options} handleSelect={handleOnPress} {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {};
