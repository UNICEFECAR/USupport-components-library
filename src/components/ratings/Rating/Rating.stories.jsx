import React from "react";

import { Rating } from "./Rating";

export default {
  title: "Components Library/ratings/Rating",
  component: Rating,
  argTypes: {},
};

const Template = (props) => <Rating {...props} />;

export const Default = Template.bind({});
Default.args = {
  maxStars: 5,
  rating: 3.24,
};
