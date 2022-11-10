import React from "react";

import { Statistic } from "./Statistic";

export default {
  title: "Components Library/cards/Statistic",
  component: Statistic,
  argTypes: {},
};

const Template = (props) => <Statistic {...props} />;

export const Default = Template.bind({});
Default.args = {
  textBold: "120",
  text: "Booked consultations",
};

export const Small = Template.bind({});
Small.args = {
  textBold: "120",
  text: "Booked consultations",
  landscapeSize: "sm",
};

export const Portrait = Template.bind({});
Portrait.args = {
  textBold: "120",
  text: "Booked consultations",
  orientation: "portrait",
};
