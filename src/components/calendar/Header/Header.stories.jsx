import React from 'react';

import { Header } from './Header';

export default {
  title: 'Components Library/calendar/Header',
  component: Header,
  argTypes: {},
};

const Template = (props) => <Header {...props} />;

export const Default = Template.bind({});
Default.args = {};
