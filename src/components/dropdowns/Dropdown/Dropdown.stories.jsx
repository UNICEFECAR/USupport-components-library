import React from "react";

import { Dropdown } from "./Dropdown";

export default {
  title: "Components Library/dropdowns/Dropdown",
  component: Dropdown,
  argTypes: {},
};

const Template = (props) => {
  const options = [
    { label: "Under 18", value: "under-18", isDisabled: false },
    { label: "18-24", value: "under-24", isDisabled: false },
    { label: "24-34", value: "under-34", isDisabled: true },
    { label: "34-44", value: "under-44", isDisabled: false },
    { label: "44-54", value: "under-54", isDisabled: false },
    { label: "54-64", value: "under-64", isDisabled: false },
    { label: "Above 65", value: "above-65", isDisabled: false },
  ];
  const [selected, setSelected] = React.useState(null);

  return (
    <Dropdown
      options={options}
      selected={selected}
      setSelected={setSelected}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  errorMessage: "This is an error message",
};
