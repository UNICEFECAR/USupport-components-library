import React from 'react';

import { Answer } from './Answer';

export default {
  title: 'Components Library/cards/Answer',
  component: Answer,
  argTypes: {},
};

const Template = (props) => <Answer {...props} />;

export const Default = Template.bind({});
Default.args = {};
