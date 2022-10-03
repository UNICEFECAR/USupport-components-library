import React from "react";

import { Tabs } from "./Tabs";

export default {
  title: "Components Library/tabs/Tabs",
  component: Tabs,
  argTypes: {},
};

const Template = (args) => {
  const [options, setOptions] = React.useState([
    { label: "All", isSelected: false },
    { label: "Depresion", isSelected: false, isInactive: true },
    { label: "Burnout", isSelected: false },
    { label: "Anxiety", isSelected: false },
    { label: "Anxiety", isSelected: false },
    { label: "Anxiety", isSelected: false },
    { label: "Anxiety", isSelected: false },
    { label: "Anxiety", isSelected: false },
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
