import React from "react";

import { Loading } from "./Loading";

export default {
  title: "Components Library/loaders/Loading",
  component: Loading,
  argTypes: {},
};

const Template = (props) => <Loading {...props} />;

export const Default = Template.bind({});
Default.args = {
  size: "lg",
  height: "10rem",
  margin: "0 auto",
  padding: "10rem",
};
