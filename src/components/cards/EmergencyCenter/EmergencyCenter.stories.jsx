import React from "react";

import { EmergencyCenter } from "./EmergencyCenter";

export default {
  title: "Components Library/cards/EmergencyCenter",
  component: EmergencyCenter,
  argTypes: {},
};

const Template = (props) => <EmergencyCenter {...props} />;

export const Default = Template.bind({});
Default.args = {
  title: "Emergency Center 1",
  text: "In this emergency center you will receive immediate help and iformation about what you exactly need.",
  btnLabel: "Contact now",
  onClick: () => {},
};
