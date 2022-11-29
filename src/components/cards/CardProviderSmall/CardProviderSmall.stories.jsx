import React from "react";

import { CardProviderSmall } from "./CardProviderSmall";

export default {
  title: "Components Library/cards/CardProviderSmall",
  component: CardProviderSmall,
  argTypes: {},
};

const Template = (props) => <CardProviderSmall {...props} />;

export const Default = Template.bind({});
Default.args = {
  name: "Joane Doe",
  description: "Therapist and life coach",
};
