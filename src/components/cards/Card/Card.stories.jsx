import React from "react";

import { Card } from "./Card";

export default {
  title: "Components Library/cards/Card",
  component: Card,
  argTypes: {},
};

const descriptionPlaceholder =
  "U support Me is the first platform that provides you with personalized care for your mental health and personal development and provides you...";

const tags = [{ name: "Depresion" }, { name: "Anxiety" }];

const data = {
  description:
    "U support Me is the first platform that provides you with personalized care for your mental health and personal development and provides you...",
  title: "How to stop negative thinking?",
  tags: [{ name: "Depresion" }, { name: "Anxiety" }],
  creator: { name: "Joe Doe" },
  readingTime: 5,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "portrait",
  tags: data.tags,
  title: data.title,
  creator: data.creator.name,
  readingTime: data.readingTime,
};

export const PortraitSmall = Template.bind({});
PortraitSmall.args = {
  type: "portrait",
  size: "sm",
  tags: data.tags,
  title: data.title,
  creator: data.creator.name,
  readingTime: data.readingTime,
};

export const PortraitSmallDescription = Template.bind({});
PortraitSmallDescription.args = {
  type: "portrait",
  size: "sm",
  tags: data.tags,
  title: data.title,
  description: data.description,
  creator: data.creator.name,
  readingTime: data.readingTime,
};

export const PortraitLarge = Template.bind({});
PortraitLarge.args = {
  type: "portrait",
  size: "lg",
  tags: data.tags,
  title: data.title,
  creator: data.creator.name,
  readingTime: data.readingTime,
};

export const LandscapeSmall = Template.bind({});
LandscapeSmall.args = {
  type: "landscape",
  size: "sm",
  tags: data.tags,
  title: data.title,
  creator: data.creator.name,
  readingTime: data.readingTime,
};

export const LandscapeLargeDesktop = Template.bind({});
LandscapeLargeDesktop.args = {
  type: "landscape",
  size: "lg",
  tags: data.tags,
  title: data.title,
  description: data.description,
  creator: data.creator.name,
  readingTime: data.readingTime,
};
