import React from "react";

import { ClientActivityLog } from "./ClientActivityLog";

export default {
  title: "Components Library/activities/ClientActivityLog",
  component: ClientActivityLog,
  argTypes: {},
};

const Template = (props) => <ClientActivityLog {...props} />;

export const NoActivities = Template.bind({});
NoActivities.args = {};

export const WithActivities = Template.bind({});
WithActivities.args = {
  activities: [
    {
      text: "You booked a video consultation",
      date: new Date(),
    },
    {
      text: "You joined a video call with Joanna Doe",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      text: " You joined a video call with Joanna Doe",
      date: new Date("12-09-2022 11:22"),
    },
  ],
};
