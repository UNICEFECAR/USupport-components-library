import React from "react";

import { CollapsibleFAQ } from "./CollapsibleFAQ";

export default {
  title: "Components Library/collapsibles/CollapsibleFAQ",
  component: CollapsibleFAQ,
  argTypes: {},
};

const questions = [
  {
    heading: "Do I need to identify my mental problems by myself?",
    text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    heading: "Can I pick my own therapists?",
    text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    heading: "Do I need to prepare something before video consultations?",
    text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    heading: "How do I get help?",
    text: "Download the app in AppStore for iOS or GooglePlay Store for Android.",
  },
];

const Template = () => <CollapsibleFAQ questions={questions} />;

export const Default = Template.bind({});
Default.args = {};
