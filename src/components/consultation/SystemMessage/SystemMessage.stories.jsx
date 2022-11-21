import React from "react";

import { SystemMessage } from "./SystemMessage";

export default {
  title: "Components Library/consultation/SystemMessage",
  component: SystemMessage,
  argTypes: {},
};

const Template = (props) => <SystemMessage {...props} />;

export const Default = Template.bind({});
Default.args = {
  iconName: "consultation",
  title: "Consultation started",
  date: new Date("01.01.2023 12:00"),
};
