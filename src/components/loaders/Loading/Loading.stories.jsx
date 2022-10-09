import React from "react";

import { Loading } from "./Loading";

export default {
  title: "Components Library/loaders/Loading",
  component: Loading,
  argTypes: {},
};

const Template = (props) => <Loading {...props} />;

export const Default = Template.bind({});
Default.args = {};
