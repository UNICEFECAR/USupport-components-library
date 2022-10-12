import React from 'react';

import { Email } from './Email';

export default {
  title: 'Components Library/templates/Email',
  component: Email,
  argTypes: {},
};

const Template = (props) => <Email {...props} />;

export const Default = Template.bind({});
Default.args = {};
