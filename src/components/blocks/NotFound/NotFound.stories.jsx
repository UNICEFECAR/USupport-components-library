import React from "react";

import { NotFound } from "./NotFound";

export default {
  title: "Components Library/blocks/NotFound",
  component: NotFound,
  argTypes: {},
};

const Template = (props) => <NotFound {...props} />;

export const Default = Template.bind({});
Default.args = {};
