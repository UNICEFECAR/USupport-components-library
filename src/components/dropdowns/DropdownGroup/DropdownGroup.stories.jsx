import React from 'react';

import { DropdownGroup } from './DropdownGroup';

export default {
  title: 'Components Library/dropdowns/DropdownGroup',
  component: DropdownGroup,
  argTypes: {},
};

const Template = (props) => <DropdownGroup {...props} />;

export const Default = Template.bind({});
Default.args = {};
