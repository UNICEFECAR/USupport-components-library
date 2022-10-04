import React from "react";

import { Grid } from "./Grid";

export default {
  title: "Components Library/grids/Grid",
  component: Grid,
  argTypes: {},
};

const Template = (args) => (
  <Grid {...args}>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 2", backgroundColor: "red", color: "white" }}
    >
      Span 2
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 4", backgroundColor: "red", color: "white" }}
    >
      Span 4
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
    <div
      style={{ gridColumn: "span 1", backgroundColor: "red", color: "white" }}
    >
      Span 1
    </div>
  </Grid>
);

const style = { height: "100vh", backgroundColor: "black" };

export const Default = Template.bind({});
Default.args = {
  style: style,
};
