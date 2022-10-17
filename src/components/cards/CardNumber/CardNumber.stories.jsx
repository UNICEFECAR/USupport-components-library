import React from "react";

import { CardNumber } from "./CardNumber";

export default {
  title: "Components Library/cards/CardNumber",
  component: CardNumber,
  argTypes: {},
};

const Template = (props) => (
  <div style={{ paddingTop: "10rem" }}>
    <CardNumber {...props} />
  </div>
);

export const CardNumber1 = Template.bind({});
CardNumber1.args = {
  number: "1",
  iconName: "community",
  text: "Create your account",
};

export const CardNumber2 = Template.bind({});
CardNumber2.args = {
  number: "2",
  iconName: "coaching",
  text: "Choose a kind of therapy",
};

export const CardNumber3 = Template.bind({});
CardNumber3.args = {
  number: "3",
  iconName: "therapy",
  text: "Choose a provider",
};

export const CardNumber4 = Template.bind({});
CardNumber4.args = {
  number: "4",
  iconName: "calm",
  text: "Clear your mind and get calm",
};
