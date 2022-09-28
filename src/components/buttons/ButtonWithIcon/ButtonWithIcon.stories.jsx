import React from "react";

import { ButtonWithIcon } from "./ButtonWithIcon";

export default {
  title: "Components Library/buttons/ButtonWithIcon",
  component: ButtonWithIcon,
  argTypes: {
    iconColor: { control: "color" },
  },
};

const Template = (args) => <ButtonWithIcon {...args} />;

export const SmallButtonWithIcon = Template.bind({});
SmallButtonWithIcon.args = {
  label: "Button",
  iconName: "phone-emergency",
  iconSize: "md",
  iconColor: "#fff",
  size: "xs",
};

export const SmallButtonWithIconPurple = Template.bind({});
SmallButtonWithIconPurple.args = {
  label: "Button",
  iconName: "phone-emergency",
  iconSize: "md",
  iconColor: "#fff",
  size: "xs",
  color: "purple",
};

export const EmergencyButton = Template.bind({});
EmergencyButton.args = {
  iconName: "phone-emergency",
  iconSize: "lg",
  iconColor: "#fff",
  color: "purple",
  onlyIcon: true,
};
