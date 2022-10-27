import React from 'react';

import { CustomCarousel } from './CustomCarousel';

export default {
  title: 'Components Library/carousels/CustomCarousel',
  component: CustomCarousel,
  argTypes: {},
};

const Template = (props) => <CustomCarousel {...props} />;

export const Default = Template.bind({});
Default.args = {};
