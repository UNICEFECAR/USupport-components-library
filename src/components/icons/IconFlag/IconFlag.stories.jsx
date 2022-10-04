import React from "react";

import { IconFlag } from "./IconFlag";

export default {
  title: "Components Library/icons/IconFlag",
  component: IconFlag,
  argTypes: {},
};

// Add each new icon to the list below
const icons = ["kazakhstan", "bulgaria", "germany", "swiss"];

export const All = (args) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {icons.map((icon, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <IconFlag flagName={icon} {...args} />
          <p style={{ paddingTop: "0.5rem" }}>{icon}</p>
        </div>
      );
    })}
  </div>
);
