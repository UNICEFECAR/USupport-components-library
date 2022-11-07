import React, { useState } from "react";
import PropTypes from "prop-types";
import { ButtonWithIcon } from "../../buttons/ButtonWithIcon/ButtonWithIcon";
import { Textarea } from "../../inputs/Textarea/Textarea";

import "./send-message.scss";

/**
 * SendMessage
 *
 * SendMessage component
 *
 * @return {jsx}
 */
export const SendMessage = ({}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className="send-message">
      <Textarea
        value={message}
        onChange={(value) => setMessage(value)}
        // rows="1"
        classes="send-message__textarea"
      />
      <ButtonWithIcon
        iconName="comment"
        iconSize="lg"
        iconColor="#FFFFFF"
        onlyIcon
        onClick={handleSend}
        circleSize="sm"
        classes={"send-message__send-button"}
      />
    </div>
  );
};

SendMessage.propTypes = {};

SendMessage.defaultProps = {};
