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
    {...props}
  />
);

export const Overview = Template.bind({});
Overview.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("2022-12-4 9:00"),
  endDate: new Date("2022-12-4 10:00"),
};

export const Live = Template.bind({});
Live.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date(),
  endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
  overview: false,
};

export const Upcoming = Template.bind({});
Upcoming.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("05/05/2024 12:00"),
  endDate: new Date("05/05/2024 13:00"),
  overview: false,
  renderIn: "provider",
};

export const Past = Template.bind({});
Past.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("05/05/2022 12:00"),
  endDate: new Date("05/05/2022 13:00"),
  overview: false,
  renderIn: "provider",
};

export const OverviewFalse = Template.bind({});
OverviewFalse.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("2022-11-1 15:00"),
  endDate: new Date("2022-11-1 16:00"),
  overview: false,
};

export const Request = Template.bind({});
Request.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("2022-11-6 15:00"),
  endDate: new Date("2022-11-6 16:00"),
  overview: false,
  requested: true,
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  name: "Dr. Joanna Doe",
  startDate: new Date("2022-11-6 15:00"),
  endDate: new Date("2022-11-6 16:00"),
  overview: false,
  hasMenu: true,
};
