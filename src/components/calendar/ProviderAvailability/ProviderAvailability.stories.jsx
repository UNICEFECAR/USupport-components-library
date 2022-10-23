import React from 'react';

import { ProviderAvailability } from './ProviderAvailability';

export default {
  title: 'Components Library/calendar/ProviderAvailability',
  component: ProviderAvailability,
  argTypes: {},
};

const Template = (props) => <ProviderAvailability {...props} />;

export const Default = Template.bind({});
Default.args = {};
