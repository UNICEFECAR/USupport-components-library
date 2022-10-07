import React from "react";

import { TextArea } from "./TextArea";

export default {
  title: "Components Library/inputs/TextArea",
  component: TextArea,
  argTypes: {},
};

const Template = (args) => <TextArea placeholder="Placeholder" {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
