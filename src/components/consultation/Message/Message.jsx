import React from "react";
import PropTypes from "prop-types";

import { getDateView, getTimeFromDate } from "../../../utils/date";

import "./message.scss";

/**
 * Message
 *
 * Message component
 *
 * @return {jsx}
 */
export const Message = ({ message, sent, received, date }) => {
  return (
    <div
      className={[
        "message",
        sent && "message-sent",
        received && "message-received",
      ].join(" ")}
    >
      <p className="text message__text">{message}</p>
      {date && (
        <p
          className={`message__date message__date--${
            sent ? "sent" : "received"
          }`}
        >
          {getDateView(date)}, {getTimeFromDate(date)}
        </p>
      )}
    </div>
  );
};

Message.propTypes = {
  /**
   * Message to display
   */
  message: PropTypes.string,

  /**
   * Is the message sent by the user
   * @default false
   */
  sent: PropTypes.bool,

  /**
   * Is the message received by the user
   * @default false
   */
  received: PropTypes.bool,
};

Message.defaultProps = {
  sent: false,
  received: false,
};
