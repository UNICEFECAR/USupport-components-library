import React from 'react';

import { ContactForm } from './ContactForm';

export default {
  title: 'Components Library/forms/ContactForm',
  component: ContactForm,
  argTypes: {},
};

const Template = (props) => <ContactForm {...props} />;

export const Default = Template.bind({});
Default.args = {};
