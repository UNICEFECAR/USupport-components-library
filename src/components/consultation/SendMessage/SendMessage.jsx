import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";

import "./send-message.scss";

// The field grows with the text up to this height, then scrolls
const MAX_TEXTAREA_HEIGHT = 120;

/**
 * SendMessage
 *
 * The chat's message field, with the send button inside it.
 * The button stays grey until there is something to send.
 * Enter sends the message, Shift + Enter adds a new line
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
  const textareaRef = useRef();
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

  // Grow the field with its content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      MAX_TEXTAREA_HEIGHT,
    )}px`;
  }, [message]);

  const canSend = message.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
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
    // The pages position and space the outer element, the field itself is the inner one
    <div className="send-message">
      <div
        className={`send-message__field ${
          canSend ? "send-message__field--has-text" : ""
        }`}
      >
        <textarea
          ref={textareaRef}
          className="send-message__textarea"
          rows={1}
          placeholder={t("textarea_placeholder")}
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          onFocus={onTextareaFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          className="send-message__send-button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label={t("send_message_button")}
          title={t("send_message_button")}
        >
          <Icon name="send" size="sm" color={canSend ? "#ffffff" : "#92989b"} />
        </button>
      </div>
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
