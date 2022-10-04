import React from "react";

import { StoreButton } from "./StoreButton";

export default {
  title: "Components Library/buttons/StoreButton",
  component: StoreButton,
  argTypes: {},
};

const Template = (props) => <StoreButton {...props} />;

export const GooglePlay = Template.bind({});
GooglePlay.args = {
  store: "google-play",
  size: "lg",
  type: "secondary",
};
