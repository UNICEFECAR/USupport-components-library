import React from 'react';

import { PaymentsHistoryTable } from './PaymentsHistoryTable';

export default {
  title: 'Components Library/tables/PaymentsHistoryTable',
  component: PaymentsHistoryTable,
  argTypes: {},
};

const Template = (props) => <PaymentsHistoryTable {...props} />;

export const Default = Template.bind({});
Default.args = {};
