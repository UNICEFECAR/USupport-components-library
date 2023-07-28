import React from 'react';

import { TypingIndicator } from './TypingIndicator';

export default {
  title: 'Components Library/labels/TypingIndicator',
  component: TypingIndicator,
  argTypes: {},
};

const Template = (props) => <TypingIndicator {...props} />;

export const Default = Template.bind({});
Default.args = {};
