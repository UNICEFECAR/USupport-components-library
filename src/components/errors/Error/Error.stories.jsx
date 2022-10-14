import React from 'react';

import { Error } from './Error';

export default {
  title: 'Components Library/errors/Error',
  component: Error,
  argTypes: {},
};

const Template = (props) => <Error {...props} />;

export const Default = Template.bind({});
Default.args = {};
