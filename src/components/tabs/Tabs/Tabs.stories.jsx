import React from "react";

import { Tabs } from "./Tabs";

export default {
  title: "Components Library/tabs/Tabs",
  component: Tabs,
  argTypes: {},
};

const Template = (args) => {
  const [options, setOptions] = React.useState([
    { label: "All", value: "all", isSelected: false },
    {
      label: "Depresion",
      value: "depresion",
      isSelected: false,
      isInactive: true,
    },
    { label: "Burnout", value: "burnout", isSelected: false },
    { label: "Anxiety1", value: "anxiety", isSelected: false },
    { label: "Anxiety2", value: "anxiety2", isSelected: false },
    { label: "Anxiety3", value: "anxiety3", isSelected: false },
    { label: "Anxiety4", value: "anxiety4", isSelected: false },
    { label: "Anxiety5", value: "value", isSelected: false },
    { label: "Burnout3", value: "Burnout3", isSelected: false },
    { label: "Burnout4", value: "Burnout4", isSelected: false },
    { label: "Burnout5", value: "value1", isSelected: false },
  ]);

  const handleOnPress = (index) => {
    const optionsCopy = [...options];

    optionsCopy[index].isSelected = !optionsCopy[index].isSelected;

    setOptions(optionsCopy);
  };

  return <Tabs options={options} handleSelect={handleOnPress} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
