import React from 'react';

import { SendMessage } from './SendMessage';

export default {
  title: 'Components Library/consultation/SendMessage',
  component: SendMessage,
  argTypes: {},
};

const Template = (props) => <SendMessage {...props} />;

export const Default = Template.bind({});
Default.args = {};
