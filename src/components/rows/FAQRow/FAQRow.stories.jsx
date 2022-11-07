import React from "react";

import { FAQRow } from "./FAQRow";

export default {
  title: "Components Library/rows/FAQRow",
  component: FAQRow,
  argTypes: {},
};

const Template = (props) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <FAQRow
      selected={selected}
      setSelected={() => setSelected(!selected)}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  question: "How do I get help?",
  answer:
    "Download the app in AppStore for iOS or GooglePlay Store for Android.",
};
