import React from 'react';

import { InputPhone } from './InputPhone';

export default {
  title: 'Components Library/inputs/InputPhone',
  component: InputPhone,
  argTypes: {},
};

const Template = (props) => <InputPhone {...props} />;

export const Default = Template.bind({});
Default.args = {};
