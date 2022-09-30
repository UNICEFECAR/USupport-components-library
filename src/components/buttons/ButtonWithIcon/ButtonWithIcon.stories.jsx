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

export const ButtonWithIconGreen = Template.bind({});
ButtonWithIconGreen.args = {
  label: "Button",
  iconName: "phone-emergency",
  iconSize: "md",
  iconColor: "#fff",
  size: "xs",
};

export const ButtonOnlyIcon = Template.bind({});
ButtonOnlyIcon.args = {
  iconName: "phone-emergency",
  iconSize: "lg",
  iconColor: "#fff",
  color: "purple",
  onlyIcon: true,
};