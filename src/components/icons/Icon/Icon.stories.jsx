import React from "react";

import { Icon } from "./Icon";

export default {
  title: "Components Library/icons/Icon",
  component: Icon,
  argTypes: {
    color: { control: "color" },
  },
};

// Add each new icon to the list below
const icons = ["filter", "phone-emergency"];

export const All = (args) => (
  <div style={{ display: "flex" }}>
    {icons.map((icon) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <Icon name={icon} {...args} />
          <h6 style={{ paddingTop: "0.5rem" }}>{icon}</h6>
        </div>
      );
    })}
  </div>
);
