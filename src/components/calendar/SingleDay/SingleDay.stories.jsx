import React from "react";

import { SingleDay } from "./SingleDay";

export default {
  title: "Components Library/calendar/SingleDay",
  component: SingleDay,
  argTypes: {},
};

const Template = (props) => <SingleDay {...props} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date("2022-10-11"),
  numberOfConsultations: 3,
};

export const NoConsultations = Template.bind({});
NoConsultations.args = {
  date: new Date("2022-10-12"),
  numberOfConsultations: 0,
};

export const Today = Template.bind({});
Today.args = {
  date: new Date(),
  numberOfConsultations: 3,
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  date: new Date("2022-10-13"),
  isAvailable: false,
};
