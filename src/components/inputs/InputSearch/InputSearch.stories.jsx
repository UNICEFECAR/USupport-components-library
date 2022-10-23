import React, { useState } from "react";
import { InputSearch } from "./InputSearch";

export default {
  title: "Components Library/inputs/InputSearch",
  component: InputSearch,
  argTypes: {},
};

const Template = (props) => {
  const [value, setValue] = useState("");

  function handleInputChange(value) {
    setValue(value);
    console.log(value);
  }
  return (
    <InputSearch
      placeholder={"Search"}
      value={value}
      onChange={handleInputChange}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
