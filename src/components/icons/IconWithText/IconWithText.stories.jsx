import React from "react";

import { IconWithText } from "./IconWithText";

export default {
  title: "Components Library/icons/IconWithText",
  component: IconWithText,
  argTypes: {},
};

const Template = (props) => <IconWithText {...props} />;
export const Default = Template.bind({});
Default.args = {
  text: <p className="paragraph">Icon with text</p>,
  iconName: "call-filled",
};
