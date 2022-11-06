import React from "react";

import { ConsultationInformation } from "./ConsultationInformation";

export default {
  title: "Components Library/cards/ConsultationInformation",
  component: ConsultationInformation,
  argTypes: {},
};

const Template = (props) => {
  return <ConsultationInformation {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  startDate: new Date("06.06.2023 18:00"),
  endDate: new Date("06.06.2023 19:00"),
  providerName: "Dr. Joanna Doe",
};
