import React from 'react';

import { Country } from './Country';

export default {
  title: 'Components Library/boxes/Country',
  component: Country,
  argTypes: {},
};

const Template = (props) => <Country {...props} />;

export const Default = Template.bind({});
Default.args = {};
