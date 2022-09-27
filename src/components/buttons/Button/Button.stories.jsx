import React from "react";

import { Button } from "./Button";

export default {
  title: "Components Library/buttons/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Primary Green",
};

export const PrimaryPurple = Template.bind({});
PrimaryPurple.args = {
  text: "Primary Purple",
  color: "purple",
};

export const SecondaryGreen = Template.bind({});
SecondaryGreen.args = {
  text: "Secondary Green",
  secondary: true,
};

export const SecondaryPurple = Template.bind({});
SecondaryPurple.args = {
  text: "Secondary Purple",
  secondary: true,
  color: "purple",
};

export const GhostGreen = Template.bind({});
GhostGreen.args = {
  text: "Ghost Green",
  ghost: true,
};

export const GhostPurple = Template.bind({});
GhostPurple.args = {
  text: "Ghost Purple",
  ghost: true,
  color: "purple",
};

export const Emergency = Template.bind({});
Emergency.args = {
  emergency: true,
};

export const SmallWithIcon = Template.bind({});
SmallWithIcon.args = {
  text: "Small",
  iconName: "phone-emergency",
  size: "xsmall",
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "Disabled",
  disabled: true,
};
