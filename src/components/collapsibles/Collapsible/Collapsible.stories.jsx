import React from "react";

import { Collapsible } from "./Collapsible";

export default {
  title: "Components Library/collapsibles/Collapsible",
  component: Collapsible,
  argTypes: {},
};

const Template = (props) => (
  <Collapsible heading={<p>Germany</p>} content={<p>Text</p>} {...props} />
);

export const Default = Template.bind({});
Default.args = {};
