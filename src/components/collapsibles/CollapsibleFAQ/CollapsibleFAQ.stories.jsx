import React from "react";

import { CollapsibleFAQ } from "./CollapsibleFAQ";

export default {
  title: "Components Library/collapsibles/CollapsibleFAQ",
  component: CollapsibleFAQ,
  argTypes: {},
};

const question = {
  heading: "How do I get help?",
  text: "Download the app in AppStore for iOS or GooglePlay Store for Android.",
};

const Template = (args) => <CollapsibleFAQ question={question} {...args} />;

export const Default = Template.bind({});
Default.args = {};