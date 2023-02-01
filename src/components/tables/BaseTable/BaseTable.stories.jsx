import React from 'react';

import { BaseTable } from './BaseTable';

export default {
  title: 'Components Library/tables/BaseTable',
  component: BaseTable,
  argTypes: {},
};

const Template = (props) => <BaseTable {...props} />;

export const Default = Template.bind({});
Default.args = {};
