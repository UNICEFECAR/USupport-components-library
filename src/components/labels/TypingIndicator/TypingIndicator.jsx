import React from "react";

import "./typing-indicator.scss";

/**
 * TypingIndicator
 *
 * Typing indicator
 *
 * @return {jsx}
 */
export const TypingIndicator = ({ text }) => {
  return (
    <div className="typing-indicator">
      <div className="typing-indicator__typing">
        <p className="small-text indicator-text">{text}</p>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};
