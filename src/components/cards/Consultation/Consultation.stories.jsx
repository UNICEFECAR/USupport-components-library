import React from "react";

import { Consultation } from "./Consultation";

export default {
  title: "Components Library/cards/Consultation",
  component: Consultation,
  argTypes: {},
};

const Template = (props) => (
  <Consultation
    joinLabel="Join"
    editLabel="Edit"
    cancelLabel="Cancel suggestion"
    daysOfWeekTranslations={{
      monday: "mon",
      tuesday: "tue",
      wednesday: "wed",
      thursday: "thu",
      friday: "fri",
      saturday: "sat",
      sunday: "sun",
    }}
    {...props}
  />
);

export const Overview = Template.bind({});
Overview.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1670144400000,
};

export const Live = Template.bind({});
Live.args = {
  name: "Dr. Joanna Doe",
  timestamp: new Date().getTime(),
  overview: false,
};

export const Upcoming = Template.bind({});
Upcoming.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1714921200000,
  overview: false,
  renderIn: "provider",
};

export const Past = Template.bind({});
Past.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1651849200000,
  overview: false,
  renderIn: "provider",
};

export const OverviewFalse = Template.bind({});
OverviewFalse.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1667746800000,
  overview: false,
};

export const Request = Template.bind({});
Request.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1714921200000,
  overview: false,
  requested: true,
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  name: "Dr. Joanna Doe",
  timestamp: 1667746800000,
  overview: false,
  hasMenu: true,
};
