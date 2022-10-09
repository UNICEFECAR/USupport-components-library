import React from "react";
import { GridItem } from "../GridItem/GridItem";

import { Grid } from "./Grid";

export default {
  title: "Components Library/grids/Grid",
  component: Grid,
  argTypes: {},
};
const style = { height: "100vh", backgroundColor: "black" };
const gridItemStyle = {
  backgroundColor: "blue",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Template = (props) => (
  <Grid {...props}>
    <GridItem xs={3} style={gridItemStyle}>
      xs=3{" "}
    </GridItem>
    <GridItem xs={3} md={6} style={gridItemStyle}>
      xs=3 md=6
    </GridItem>
    <GridItem xs={3} md={8} lg={12} style={gridItemStyle}>
      xs=3 md=6 lg=9
    </GridItem>

    <GridItem xs={2} md={4} lg={6} style={gridItemStyle}>
      xs=2 md=4 lg=6
    </GridItem>

    <GridItem xs={2} md={4} lg={6} style={gridItemStyle}>
      xs=2 md=4 lg=6
    </GridItem>

    <GridItem xs={2} md={4} lg={6} style={gridItemStyle}>
      xs=2 md=4 lg=6
    </GridItem>

    <GridItem xs={2} md={4} lg={6} style={gridItemStyle}>
      xs=2 md=4 lg=6
    </GridItem>

    <GridItem xs={3} md={5} lg={7} style={gridItemStyle}>
      xs=3 md=5 lg=7
    </GridItem>

    <GridItem xs={3} md={5} lg={7} style={gridItemStyle}>
      xs=3 md=5 lg=7
    </GridItem>

    <GridItem lg={12} style={gridItemStyle}>
      lg=12
    </GridItem>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  style: style,
};
