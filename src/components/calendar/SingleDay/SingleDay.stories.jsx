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
  date: "",
  numberOfConsultations: 3,
};

export const NoConsultations = Template.bind({});
NoConsultations.args = {
  date: "",
  numberOfConsultations: 0,
};
