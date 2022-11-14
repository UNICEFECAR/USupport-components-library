import React from "react";
import PropTypes from "prop-types";

import "./message.scss";

/**
 * Message
 *
 * Message component
 *
 * @return {jsx}
 */
export const Message = ({ message, sent, received }) => {
  return (
    <div
      className={[
        "message",
        sent && "message-sent",
        received && "message-received",
      ].join(" ")}
    >
      <p className="text message__text">{message}</p>
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
