import React from "react";

import { CardMedia } from "./CardMedia";

export default {
  title: "Components Library/cards/CardMedia",
  component: CardMedia,
  argTypes: {},
};

const data = {
  description:
    "U support Me is the first platform that provides you with personalized care for your mental health and personal development and provides you...",
  title: "How to stop negative thinking? da da d sa d as da. aa sd",
  labels: [
    { name: "Depresion" },
    { name: "Anxiety" },
    { name: "Talking" },
    { name: "Breathing" },
    { name: "Lorem" },
    {
      name: "Self-imporvement and some more long words to see if it wraps correctly and some more words",
    },
  ],
  creator: { name: "Joe Doe" },
  readingTime: 5,
};

const Template = (props) => <CardMedia {...props} />;

export const Default = Template.bind({});
Default.args = {
  type: "portrait",
  size: "sm",
  labels: data.labels,
  showLabels: true,
  title: data.title,
  description: data.description,
  creator: data.creator.name,
  readingTime: data.readingTime,
  showDescription: false,
};
