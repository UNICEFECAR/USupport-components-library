import React from "react";

import { List } from "./List";

export default {
  title: "Components Library/lists/List",
  component: List,
  argTypes: {},
};

const Template = (props) => <List {...props} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      value: "Item 1",
    },
    {
      value: "Item 2",
    },
    {
      value: "Item 3",
    },
  ],
};
