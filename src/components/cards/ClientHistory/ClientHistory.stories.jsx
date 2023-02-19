import React from "react";

import { ClientHistory } from "./ClientHistory";

export default {
  title: "Components Library/cards/ClientHistory",
  component: ClientHistory,
  argTypes: {},
};

const Template = (props) => <ClientHistory {...props} />;

export const Default = Template.bind({});
Default.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
  endDate: new Date(new Date().setHours(new Date().getHours() + 2)),
  pastConsultations: 5,
};

export const NoNextConsultation = Template.bind({});
NoNextConsultation.args = {
  name: "Dr. Joanna Doe",
  pastConsultations: 5,
};

export const Live = Template.bind({});
Live.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date(new Date().setHours(new Date().getHours() - 1)),
  endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
  pastConsultations: 5,
};
