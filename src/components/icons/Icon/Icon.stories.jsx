import React from "react";

import { Icon } from "./Icon";

export default {
  title: "Icons/Icon",
  component: Icon,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => <Icon {...args} />;

export const Filter = Template.bind({});
Filter.args = {
  name: "filter",
};

export const PhoneEmergency = Template.bind({});
PhoneEmergency.args = {
  name: "phone-emergency",
};
