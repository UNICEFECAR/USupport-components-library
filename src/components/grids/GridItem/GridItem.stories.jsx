import React from "react";
import { Grid } from "../Grid/Grid";

import { GridItem } from "./GridItem";

const style = { height: "100vh", backgroundColor: "black" };

export default {
  title: "Components Library/grids/GridItem",
  component: GridItem,
  argTypes: { control: "color" },
};

const Template = (props) => (
  <Grid style={style}>
    <GridItem {...props} />
    <GridItem {...props} />
    <GridItem {...props} />
    <GridItem {...props} />
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  xs: 2,
  md: 4,
  xl: 12,
  style: { backgroundColor: "blue", color: "white" },
};
