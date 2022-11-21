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
const icons = [
  "filter",
  "phone-emergency",
  "comment",
  "info",
  "fingerprint",
  "star",
  "star-full",
  "document",
  "notifications",
  "share",
  "hangup",
  "stop-camera",
  "stop-mic",
  "view",
  "hide",
  "arrow-chevron-up",
  "arrow-chevron-down",
  "search",
  "close-x",
  "microphone",
  "tag",
  "heart",
  "person",
  "two-people",
  "hashtag",
  "three-people",
  "share-back",
  "time",
  "cart",
  "bag",
  "calendar",
  "call",
  "schedule",
  "read-book",
  "home",
  "two-hands",
  "flash",
  "back-arrow",
  "forward-arrow",
  "arrow-chevron-back",
  "arrow-chevron-forward",
  "arrow-caret-back",
  "arrow-caret-forward",
  "arrow-select",
  "arrow-down",
  "arrow-up",
  "arrow-caret-up",
  "arrow-caret-down",
  "export",
  "actions-plus",
  "action-minus",
  "circle-actions-success",
  "circle-actions-close",
  "circle-actions-alert-info",
  "circle-actions-alert-question",
  "check",
  "mail",
  "sound-playing",
  "sound-muted",
  "app-store",
  "community",
  "therapy",
  "self-care",
  "coaching",
  "calm",
  "flag-KZ",
  "flag-BG",
  "flag-KG",
  "navbar-burger",
  "globe",
  "linkedin",
  "facebook",
  "twitter",
  "call-filled",
  "pin",
  "mail-filled",
  "consultation",
  "google-login",
  "facebook-login",
  "copy",
  "exit",
  "video",
  "menu",
  "article",
  "live-consultation",
  "mail-admin",
  "dollar",
  "edit",
  "delete",
  "trash",
  "share-front",
];

export const All = (props) => (
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
          <Icon name={icon} {...props} />
          <p className="text" style={{ paddingTop: "0.5rem" }}>
            {icon}
          </p>
        </div>
      );
    })}
  </div>
);
