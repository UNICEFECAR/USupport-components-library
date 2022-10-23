import React from "react";

import { Notification } from "./Notification";

export default {
  title: "Components Library/notifications/Notification",
  component: Notification,
  argTypes: {},
};

const Template = (props) => <Notification {...props} />;

export const Default = Template.bind({});
Default.args = {
  icon: "document",
  title: "USupporyMe",
  date: new Date("2022-10-11"),
  text: "John Doe suggest to reschedule a counsultation, do you confirm that?",
};

export const Read = Template.bind({});
Read.args = {
  icon: "document",
  title: "USupporyMe",
  text: "John Doe suggest to reschedule a counsultation, do you confirm that?",
  isRead: true,
};
