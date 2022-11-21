import React from "react";

import { Message } from "./Message";

export default {
  title: "Components Library/consultation/Message",
  component: Message,
  argTypes: {},
};

const Template = (props) => <Message {...props} />;

export const Sent = Template.bind({});
Sent.args = {
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra mattis lectus turpis mauris odio vestibulum urna.",
  sent: true,
};

export const Received = Template.bind({});
Received.args = {
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra mattis lectus turpis mauris odio vestibulum urna.",
  received: true,
};
