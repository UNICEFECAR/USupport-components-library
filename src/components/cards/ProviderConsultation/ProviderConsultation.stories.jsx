import React from 'react';

import { ProviderConsultation } from './ProviderConsultation';

export default {
  title: 'Components Library/cards/ProviderConsultation',
  component: ProviderConsultation,
  argTypes: {},
};

const Template = (props) => <ProviderConsultation {...props} />;

export const Default = Template.bind({});
Default.args = {};
