import React from 'react';

import { ProviderDetails } from './ProviderDetails';

export default {
  title: 'Components Library/blocks/ProviderDetails',
  component: ProviderDetails,
  argTypes: {},
};

const Template = (props) => <ProviderDetails {...props} />;

export const Default = Template.bind({});
Default.args = {};
