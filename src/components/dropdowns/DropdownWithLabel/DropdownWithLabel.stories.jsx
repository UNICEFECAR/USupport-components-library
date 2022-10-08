import React from 'react';

import { DropdownWithLabel } from './DropdownWithLabel';

export default {
  title: 'Components Library/dropdowns/DropdownWithLabel',
  component: DropdownWithLabel,
  argTypes: {},
};

const Template = (props) => <DropdownWithLabel {...props} />;

export const Default = Template.bind({});
Default.args = {};
