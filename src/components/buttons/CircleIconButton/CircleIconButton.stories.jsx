import React from "react";

import { CircleIconButton } from "./CircleIconButton";

export default {
  title: "Components Library/buttons/CircleIconButton",
  component: CircleIconButton,
  argTypes: {},
};

const Template = (props) => <CircleIconButton {...props} />;

export const Default = Template.bind({});
Default.args = {
  label: "SOS Center",
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  label: undefined,
  iconName: "comment-flipped",
};
