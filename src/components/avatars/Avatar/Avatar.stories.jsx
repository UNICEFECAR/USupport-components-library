import React from "react";

import { Avatar } from "./Avatar";

export default {
  title: "Components Library/avatars/Avatar",
  component: Avatar,
  argTypes: {},
};

const Template = (props) => <Avatar {...props} />;

export const Default = Template.bind({});
Default.args = {};
