import React from "react";

import { CardConsultationBig } from "./CardConsultationBig";

export default {
  title: "Components Library/cards/CardConsultationBig",
  component: CardConsultationBig,
  argTypes: {},
};

const Template = (props) => <CardConsultationBig {...props} />;

export const Default = Template.bind({});
Default.args = {
  specialistName: "Joanna Doe",
  consultationDate: "12/12/2020",
};

export const Live = Template.bind({});
Live.args = {
  specialistName: "Joanna Doe",
  consultationDate: "12/12/2020",
  isLive: true,
};
