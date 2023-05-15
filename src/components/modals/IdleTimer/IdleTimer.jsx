import React, { useState, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Modal } from "../Modal";
import { FIVE_MINUTES } from "../../../utils";

import "./idle-timer.scss";
import { useNavigate } from "react-router-dom";

const timeout = FIVE_MINUTES * 4;
// const timeout = 10_000;

/**
 * IdleTimer
 *
 * Idle timer
 *
 * @return {jsx}
 */
export const IdleTimer = ({ setLoggedIn, t }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onIdle = () => {
    setOpen(true);
  };

  const onPrompt = () => {
    setOpen(true);
  };

  const { activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout,
    throttle: 500,
  });

  const timeoutRef = useRef();
  const handleLogout = () => {
    timeoutRef.current = null;
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("token-expires-in");
    setLoggedIn(false);
    navigate("/");
  };

  const [timeToLogout, setTimeToLogout] = useState(20);

  useEffect(() => {
    if (open) {
      timeoutRef.current = setInterval(() => {
        setTimeToLogout((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (timeToLogout === -1) {
      clearInterval(timeoutRef.current);
      handleLogout();
      setOpen(false);
    }
  }, [timeToLogout]);

  const handleStillHere = () => {
    activate();
    setTimeToLogout(20);
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      ctaLabel={t("cta")}
      ctaHandleClick={handleStillHere}
      heading={t("heading")}
      text={t("text", { seconds: timeToLogout })}
      overlayClasses="idle-timer"
    />
  );
};
