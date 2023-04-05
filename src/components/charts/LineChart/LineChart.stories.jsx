import React from 'react';

import { LineChart } from './LineChart';

export default {
  title: 'Components Library/charts/LineChart',
  component: LineChart,
  argTypes: {},
};

const Template = (props) => <LineChart {...props} />;

export const Default = Template.bind({});
Default.args = {};
