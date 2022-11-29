import React from "react";

import { ConsultationBig } from "./ConsultationBig";

export default {
  title: "Components Library/cards/ConsultationBig",
  component: ConsultationBig,
  argTypes: {},
};

const Template = (props) => <ConsultationBig {...props} />;

export const Default = Template.bind({});
Default.args = {
  providerName: "Joanna Doe",
  consultationDate: "12/12/2020",
};

export const Live = Template.bind({});
Live.args = {
  providerName: "Joanna Doe",
  consultationDate: "12/12/2020",
  isLive: true,
};
