import React, { useState, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Modal } from "../Modal";
import { FIVE_MINUTES } from "../../../utils";

import "./idle-timer.scss";
import { useNavigate } from "react-router-dom";

// const timeout = FIVE_MINUTES * 4;
const timeout = 10_000;
const promptBeforeIdle = 4_000;

/**
 * IdleTimer
 *
 * Idle timer
 *
 * @return {jsx}
 */
export const IdleTimer = ({ setLoggedIn, t }) => {
  const [remaining, setRemaining] = useState(timeout);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onIdle = () => {
    setOpen(true);
  };

  const onPrompt = () => {
    setOpen(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleStillHere = () => {
    activate();
  };

  const timeoutRef = useRef();
  const handleLogout = () => {
    console.log("handleLogout");
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
        console.log("here");
        setTimeToLogout((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timeoutRef.current) {
        console.log("clear timeout", timeoutRef.current);
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
      console.log("clear interval");
      clearInterval(timeoutRef.current);
      handleLogout();
      setOpen(false);
    }
  }, [timeToLogout]);

  const handleCloseModal = () => {
    setOpen(false);
    handleStillHere();
  };

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);

  return (
    <Modal
      isOpen={open}
      ctaLabel={t("cta")}
      ctaHandleClick={handleCloseModal}
      closeModal={handleCloseModal}
      heading={t("heading")}
      text={t("text", { seconds: timeToLogout })}
    />
  );
};

IdleTimer.propTypes = {
  // Add propTypes here
};

IdleTimer.defaultProps = {
  // Add defaultProps here
};
