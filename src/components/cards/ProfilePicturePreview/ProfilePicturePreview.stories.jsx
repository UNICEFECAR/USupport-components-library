import React from 'react';

import { ProfilePicturePreview } from './ProfilePicturePreview';

export default {
  title: 'Components Library/cards/ProfilePicturePreview',
  component: ProfilePicturePreview,
  argTypes: {},
};

const Template = (props) => <ProfilePicturePreview {...props} />;

export const Default = Template.bind({});
Default.args = {};
