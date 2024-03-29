import React, { useState, useEffect, useRef } from "react";
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
export const SendMessage = ({
  handleSubmit,
  onTextareaFocus,
  emitTyping,
  t,
}) => {
  const [message, setMessage] = useState("");
  const emiTypingLastExecuted = useRef(Date.now());
  const interval = 1000;

  useEffect(() => {
    if (Date.now() >= emiTypingLastExecuted.current + interval) {
      emiTypingLastExecuted.current = Date.now();
      if (message) {
        emitTyping("typing");
      }
    } else {
      const timerId = setTimeout(() => {
        emiTypingLastExecuted.current = Date.now();
        if (message) {
          emitTyping("typing");
        }
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [message, interval]);

  const handleSend = () => {
    if (!message) return;
    handleSubmit(message);
    setMessage("");
    emitTyping("stop");
  };

  const handleTyping = (value) => {
    if (!value) {
      emitTyping("stop");
    }
    setMessage(value);
  };

  return (
    <div className="send-message">
      <Textarea
        placeholder={t("textarea_placeholder")}
        value={message}
        onChange={handleTyping}
        classes="send-message__textarea"
        onFocus={onTextareaFocus}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <ButtonWithIcon
        iconName="comment-white"
        iconSize="md"
        iconColor="#FFFFFF"
        onlyIcon
        onClick={handleSend}
        circleSize="sm"
        classes="send-message__send-button"
      />
    </div>
  );
};

SendMessage.propTypes = {
  /**
   * Function to handle the submit of the message to the API
   */
  handleSubmit: PropTypes.func.isRequired,
};

SendMessage.defaultProps = {};
