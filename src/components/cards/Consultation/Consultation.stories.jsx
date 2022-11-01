import React from "react";

import { Consultation } from "./Consultation";

export default {
  title: "Components Library/cards/Consultation",
  component: Consultation,
  argTypes: {},
};

const Template = (props) => <Consultation {...props} />;

export const Overview = Template.bind({});
Overview.args = {
  specialistName: "Dr. Joanna Doe",
  startDate: new Date("2022-12-4 9:00"),
  endDate: new Date("2022-12-4 10:00"),
};

export const OverviewFalse = Template.bind({});
OverviewFalse.args = {
  specialistName: "Dr. Joanna Doe",
  startDate: new Date("2022-11-1 15:00"),
  endDate: new Date("2022-11-1 16:00"),
  overview: false,
};

export const Request = Template.bind({});
Request.args = {
  specialistName: "Dr. Joanna Doe",
  startDate: new Date("2022-11-6 15:00"),
  endDate: new Date("2022-11-6 16:00"),
  overview: false,
  requested: true,
};
