import React from 'react';

import { AdminsTable } from './AdminsTable';

export default {
  title: 'Components Library/tables/AdminsTable',
  component: AdminsTable,
  argTypes: {},
};

const Template = (props) => <AdminsTable {...props} />;

export const Default = Template.bind({});
Default.args = {};
