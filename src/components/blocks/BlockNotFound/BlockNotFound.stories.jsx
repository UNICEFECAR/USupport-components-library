import React from "react";

import { Block404 } from "./BlockNotFound";

export default {
  title: "Components Library/blocks/BlockNotFound",
  component: BlockNotFound,
  argTypes: {},
};

const Template = (props) => <BlockNotFound {...props} />;

export const Default = Template.bind({});
Default.args = {};
