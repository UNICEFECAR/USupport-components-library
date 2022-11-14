import React from "react";

import { SOSCenterRow } from "./SOSCenterRow";

export default {
  title: "Components Library/rows/SOSCenterRow",
  component: SOSCenterRow,
  argTypes: {},
};

const Template = (props) => (
  <SOSCenterRow
    {...props}
    heading="Emergency center 1"
    text="In this emergency center you will receive immediate help and information about what you exactly need."
  />
);

export const Default = Template.bind({});
Default.args = {
  link: "https://www.support.com",
  phone: "0888888888",
};

export const OnlyLink = Template.bind({});
OnlyLink.args = {
  link: "https://www.support.com",
};

export const onlyPhone = Template.bind({});
onlyPhone.args = {
  phone: "0888888888",
};
