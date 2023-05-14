import React from 'react';

import { StatusBadge } from './StatusBadge';

export default {
  title: 'Components Library/cards/StatusBadge',
  component: StatusBadge,
  argTypes: {},
};

const Template = (props) => <StatusBadge {...props} />;

export const Default = Template.bind({});
Default.args = {};
