import React from "react";

import { Button } from "./Button";

export default {
  title: "Components Library/buttons/Button",
  component: Button,
};

const Template = (props) => <Button label={"Button"} {...props} />;

export const PrimaryGreen = Template.bind({});
PrimaryGreen.args = {};

export const PrimaryPurple = Template.bind({});
PrimaryPurple.args = {
  color: "purple",
};

export const SecondaryGreen = Template.bind({});
SecondaryGreen.args = {
  type: "secondary",
};

export const SecondaryPurple = Template.bind({});
SecondaryPurple.args = {
  type: "secondary",
  color: "purple",
};

export const TextButton = Template.bind({});
TextButton.args = {
  type: "text",
};

export const GhostGreen = Template.bind({});
GhostGreen.args = {
  type: "ghost",
};

export const Link = Template.bind({});
Link.args = {
  type: "link",
};
