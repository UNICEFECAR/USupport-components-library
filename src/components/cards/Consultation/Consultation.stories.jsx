import React from "react";

import { Consultation } from "./Consultation";

export default {
  title: "Components Library/cards/Consultation",
  component: Consultation,
  argTypes: {},
};

const Template = (props) => <Consultation {...props} />;

export const Default = Template.bind({});
Default.args = {
  specialistName: "Joanna Doe",
  consultationDate: "15th May, 12:30 PM",
};

export const Live = Template.bind({});
Live.args = {
  specialistName: "Joanna Doe",
  consultationDate: "15th May, 12:30 PM",
  isLive: true,
};

export const NoBooking = Template.bind({});
NoBooking.args = {
  specialistName: "",
  consultationDate: "",
};
