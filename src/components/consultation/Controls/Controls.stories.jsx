import React from "react";

import { Controls } from "./Controls";

export default {
  title: "Components Library/consultation/Controls",
  component: Controls,
  argTypes: {},
};

const Template = (props) => <Controls {...props} />;

export const Default = Template.bind({});
Default.args = {
  startDate: new Date("06.06.2023 18:00"),
  endDate: new Date("06.06.2023 19:00"),
  providerName: "Dr. Joanna Doe",
};
