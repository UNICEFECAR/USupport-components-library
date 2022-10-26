import React from 'react';

import { Backdrop } from './Backdrop';

export default {
  title: 'Components Library/modals/Backdrop',
  component: Backdrop,
  argTypes: {},
};

const Template = (props) => <Backdrop {...props} />;

export const Default = Template.bind({});
Default.args = {};
