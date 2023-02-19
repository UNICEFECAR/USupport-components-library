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
  consultation: {
    providerName: "Joanna Doe",
    timestamp: 1714921200000,
  },
};

export const Live = Template.bind({});
Live.args = {
  consultation: {
    providerName: "Joanna Doe",
    timestamp: 1669496673000,
  },
};
