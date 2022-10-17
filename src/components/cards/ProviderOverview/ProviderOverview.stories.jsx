import React from "react";

import { ProviderOverview } from "./ProviderOverview";

export default {
  title: "Components Library/cards/ProviderOverview",
  component: ProviderOverview,
  argTypes: {},
};

const Template = (props) => <ProviderOverview {...props} />;

export const Default = Template.bind({});
Default.args = {
  name: "Dr. Joanna Doe",
  specialities: "Psychiatrist, Neuropsychiatrist, Psychotherapist",
  experience: 16,
};

export const WithDate = Template.bind({});
WithDate.args = {
  name: "Dr. Joanna Doe",
  date: "Fri, 17.10.2022 9:00-10:00",
};
