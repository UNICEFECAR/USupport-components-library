import React from "react";

import { Emoticon } from "./Emoticon";

export default {
  title: "Components Library/icons/Emoticon",
  component: Emoticon,
  argTypes: {},
};

const emoticons = ["happy", "good", "notgood", "bad", "verybad"];

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
          <Emoticon name={`emoji-${emoticon}`} size={"sm"} />
          <h6 style={{ paddingTop: "0.5rem" }}>{emoticon}</h6>
        </div>
      );
    })}
  </div>
);
