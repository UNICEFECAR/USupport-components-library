import React from "react";

import { Box } from "./Box";

export default {
  title: "Components Library/boxes/Box",
  component: Box,
  argTypes: {},
};

const Template = (props) => (
  <Box {...props} style={{ width: "50rem", height: "50rem" }} />
);

export const BorderSmall = Template.bind({});
BorderSmall.args = {
  borderSize: "sm",
};

export const BorderMedium = Template.bind({});
BorderMedium.args = {
  borderSize: "md",
};

export const BorderLarge = Template.bind({});
BorderLarge.args = {
  borderSize: "lg",
};

export const BoxShadow1 = Template.bind({});
BoxShadow1.args = {
  boxShadow: "1",
};

export const BoxShadow2 = Template.bind({});
BoxShadow2.args = {
  boxShadow: "2",
};

export const BoxShadow3 = Template.bind({});
BoxShadow3.args = {
  boxShadow: "3",
};
