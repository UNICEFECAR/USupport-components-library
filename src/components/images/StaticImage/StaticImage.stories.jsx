import React from 'react';

import { StaticImage } from './StaticImage';

export default {
  title: 'Components Library/images/StaticImage',
  component: StaticImage,
  argTypes: {},
};

const Template = (props) => <StaticImage {...props} />;

export const Default = Template.bind({});
Default.args = {};
