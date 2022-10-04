import React from "react";

import { Block } from "./Block";

export default {
  title: "Components Library/blocks/Block",
  component: Block,
  argTypes: {
    color: { constrol: "color" },
  },
};

const box = (
  <div style={{ width: "100%", height: "10rem", backgroundColor: "red" }}></div>
);

const style = { backgroundColor: "blue" };

const Template = (args) => <Block {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: box,
  style: style,
};
