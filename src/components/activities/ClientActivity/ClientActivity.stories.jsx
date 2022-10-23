import React from "react";

import { ClientActivity } from "./ClientActivity";

export default {
  title: "Components Library/activities/ClientActivity",
  component: ClientActivity,
  argTypes: {},
};

const Template = (props) => <ClientActivity {...props} />;

export const Default = Template.bind({});
Default.args = {
  text: "You booked a video consultation",
  date: new Date("2022-10-11 12:25:00"),
};

export const Yesterday = Template.bind({});
Yesterday.args = {
  text: "You booked a video consultation",
  date: new Date(new Date().setDate(new Date().getDate() - 1)),
};

export const Today = Template.bind({});
Today.args = {
  text: "You booked a video consultation",
  date: new Date(),
};
