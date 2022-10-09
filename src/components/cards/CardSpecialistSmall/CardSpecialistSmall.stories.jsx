import React from "react";

import { CardSpecialistSmall } from "./CardSpecialistSmall";

export default {
  title: "Components Library/cards/CardSpecialistSmall",
  component: CardSpecialistSmall,
  argTypes: {},
};

const Template = (props) => <CardSpecialistSmall {...props} />;

export const Default = Template.bind({});
Default.args = {
  name: "Joane Doe",
  description: "Therapist and life coach",
};
