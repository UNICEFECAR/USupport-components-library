import React from "react";

import { ButtonWithIcon } from "./ButtonWithIcon";

export default {
  title: "Components Library/buttons/ButtonWithIcon",
  component: ButtonWithIcon,
  argTypes: {
    iconColor: { control: "color" },
  },
};

const Template = (props) => <ButtonWithIcon {...props} />;

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

export const ButtonWithIconRed = Template.bind({});
ButtonWithIconRed.args = {
  iconName: "circle-close",
  iconSize: "md",
  iconColor: "#eb5757",
  color: "red",
  label: "Button",
  type: "ghost",
};
