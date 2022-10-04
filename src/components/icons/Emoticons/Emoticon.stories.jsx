import React from "react";

import { Emoticon } from "./Emoticon";

export default {
  title: "Components Library/icons/Emoticon",
  component: Emoticon,
  argTypes: {},
};

const emoticons = ["happy", "good", "not-good", "bad", "very-bad"];

export const All = (args) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {emoticons.map((emoticon, index) => {
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
          <Emoticon name={`emoticon-${emoticon}`} {...props} />
          <p className="text" style={{ paddingTop: "0.5rem" }}>
            {emoticon}
          </p>
        </div>
      );
    })}
  </div>
);
