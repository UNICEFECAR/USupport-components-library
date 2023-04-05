import React from 'react';

import { MoodTrackDetails } from './MoodTrackDetails';

export default {
  title: 'Components Library/cards/MoodTrackDetails',
  component: MoodTrackDetails,
  argTypes: {},
};

const Template = (props) => <MoodTrackDetails {...props} />;

export const Default = Template.bind({});
Default.args = {};
