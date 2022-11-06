import React from "react";

import { CollapsibleFAQ } from "./CollapsibleFAQ";

export default {
  title: "Components Library/collapsibles/CollapsibleFAQ",
  component: CollapsibleFAQ,
  argTypes: {},
};

const faqs = [
  {
    question: "Do I need to identify my mental problems by myself?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    question: "Can I pick my own therapists?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    question: "Do I need to prepare something before video consultations?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius dignissim elementum.",
  },
  {
    question: "How do I get help?",
    answer:
      "Download the app in AppStore for iOS or GooglePlay Store for Android.",
  },
];

const Template = () => <CollapsibleFAQ data={faqs} />;

export const Default = Template.bind({});
Default.args = {};
