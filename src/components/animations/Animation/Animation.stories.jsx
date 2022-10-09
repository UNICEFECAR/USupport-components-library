import React from "react";
import { Animation } from "./Animation";
import Mascot from "./assets/Mascot.json";

export default {
  title: "Components Library/animations/Animation",
  component: Animation,
  argTypes: {},
};

const Template = (props) => (
  <div style={{ width: "20rem" }}>
    <Animation {...props} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  json: Mascot,
};
