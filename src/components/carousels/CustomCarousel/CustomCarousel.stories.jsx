import React from "react";

import { CustomCarousel } from "./CustomCarousel";

export default {
  title: "Components Library/carousels/CustomCarousel",
  component: CustomCarousel,
  argTypes: {},
};

const Template = (props) => (
  <CustomCarousel {...props}>
    <h4>Test 1</h4>
    <h4>Test 2</h4>
    <h4>Test 3</h4>
    <h4>Test 4</h4>
    <h4>Test 5</h4>
  </CustomCarousel>
);

export const Default = Template.bind({});
Default.args = {};
