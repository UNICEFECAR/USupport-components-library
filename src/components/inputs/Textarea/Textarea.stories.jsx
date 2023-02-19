import React from "react";

import { Textarea } from "./Textarea";

export default {
  title: "Components Library/inputs/Textarea",
  component: Textarea,
  argTypes: {},
};

const Template = (args) => <Textarea placeholder="Placeholder" {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
