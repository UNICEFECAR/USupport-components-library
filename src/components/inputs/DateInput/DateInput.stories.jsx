import React from 'react';

import { DateInput } from './DateInput';

export default {
  title: 'Components Library/inputs/DateInput',
  component: DateInput,
  argTypes: {},
};

const Template = (props) => <DateInput {...props} />;

export const Default = Template.bind({});
Default.args = {};
