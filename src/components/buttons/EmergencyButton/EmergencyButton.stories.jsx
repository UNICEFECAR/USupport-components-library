import React from "react";

import { EmergencyButton } from "./EmergencyButton";

export default {
  title: "Components Library/buttons/EmergencyButton",
  component: EmergencyButton,
  argTypes: {},
};

const Template = (args) => <EmergencyButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  classes: "",
};