import React from "react";

import { Markdown } from "./Markdown";

export default {
  title: "Components Library/markdown/Markdown",
  component: Markdown,
  argTypes: {},
};

const markDownText =
  "## Client \n\n **Bold** \n\n _Italic_ \n\n <u>Underline</u> \n\n ```Code``` \n\n # H1 \n\n## H2 \n\n### H3 \n\n#### H4 \n\n##### H5 ";

const Template = (props) => {
  return <Markdown markDownText={markDownText} {...props} />;
};

export const Default = Template.bind({});
Default.args = {};
