import React from 'react';

import { IdleTimer } from './IdleTimer';

export default {
  title: 'Components Library/modals/IdleTimer',
  component: IdleTimer,
  argTypes: {},
};

const Template = (props) => <IdleTimer {...props} />;

export const Default = Template.bind({});
Default.args = {};
