import React from "react";

import { ConsultationDashboard } from "./ConsultationDashboard";

export default {
  title: "Components Library/cards/ConsultationDashboard",
  component: ConsultationDashboard,
  argTypes: {},
};

const Template = (props) => <ConsultationDashboard {...props} />;

export const Default = Template.bind({});
Default.args = {
  providerName: "Joanna Doe",
  consultationDate: "15th May, 12:30 PM",
};

export const Live = Template.bind({});
Live.args = {
  providerName: "Joanna Doe",
  consultationDate: "15th May, 12:30 PM",
  isLive: true,
};

export const NoBooking = Template.bind({});
NoBooking.args = {
  providerName: "",
  consultationDate: "",
};
