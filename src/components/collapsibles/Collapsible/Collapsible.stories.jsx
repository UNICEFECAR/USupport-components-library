import React from "react";

import { Collapsible } from "./Collapsible";

export default {
  title: "Components Library/collapsibles/Collapsible",
  component: Collapsible,
  argTypes: {},
};

const Template = (args) => (
  <Collapsible
    heading={<p>Germany</p>}
    collapsibleContent={<p>Text</p>}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {};
