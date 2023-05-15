import React from 'react';

import { Select } from './Select';

export default {
  title: 'Components Library/inputs/Select',
  component: Select,
  argTypes: {},
};

const Template = (props) => <Select {...props} />;

export const Default = Template.bind({});
Default.args = {};
