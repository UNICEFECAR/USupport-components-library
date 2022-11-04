import React from 'react';

import { TermsAgreement } from './TermsAgreement';

export default {
  title: 'Components Library/policies/TermsAgreement',
  component: TermsAgreement,
  argTypes: {},
};

const Template = (props) => <TermsAgreement {...props} />;

export const Default = Template.bind({});
Default.args = {};
