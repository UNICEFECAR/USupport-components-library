import React, { useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext, getDateView, getTimeFromDate } from "../../../utils";

import "./message.scss";

/**
 * Message
 *
 * Message component
 *
 * @return {jsx}
 */
export const Message = ({ message, sent, received, date, showDate }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      {showDate && (
        <div
          className={[
            "message-date",
            theme === "dark" && "message-date--dark",
          ].join(" ")}
        >
          <p className="small-text">
            <strong>{getDateView(date)}</strong>
          </p>
        </div>
      )}
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
            className={`small-text message__date message__date--${
              sent ? "sent" : "received"
            }`}
          >
            {getTimeFromDate(date)}
          </p>
        )}
      </div>
    </React.Fragment>
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

  /**
   * Wheter to show the date
   * */
  showDate: PropTypes.bool,
};

Message.defaultProps = {
  sent: false,
  received: false,
};
