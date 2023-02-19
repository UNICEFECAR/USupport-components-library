import React from "react";

import { ArticleRow } from "./ArticleRow";

export default {
  title: "Components Library/rows/ArticleRow",
  component: ArticleRow,
  argTypes: {},
};

const Template = (props) => (
  <ArticleRow
    heading="Title"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa sapien faucibus et molestie ac feugiat sed. In vitae turpis massa sed elementum tempus egestas sed sed. Amet luctus venenatis...."
    {...props}
  />
);

export const Default = Template.bind({});
Default.args = {};
