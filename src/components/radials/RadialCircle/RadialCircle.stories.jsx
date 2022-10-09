import React from 'react';

import { RadialCircle } from './RadialCircle';

export default {
  title: 'Components Library/radials/RadialCircle',
  component: RadialCircle,
  argTypes: {},
};

const Template = (props) => <RadialCircle {...props} />;

export const Default = Template.bind({});
Default.args = {};
