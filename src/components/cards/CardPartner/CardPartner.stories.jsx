import React from 'react';

import { CardPartner } from './CardPartner';

export default {
  title: 'Components Library/cards/CardPartner',
  component: CardPartner,
  argTypes: {},
};

const Template = (props) => <CardPartner {...props} />;

export const Default = Template.bind({});
Default.args = {};
