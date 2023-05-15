import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
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
export const IdleTimer = ({ setLoggedIn }) => {
  const [state, setState] = useState("Active");
  const [remaining, setRemaining] = useState(timeout);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onIdle = () => {
    setState("Idle");
    setOpen(true);
  };

  const onActive = () => {
    setState("Active");
  };

  const onPrompt = () => {
    setState("Prompted");
    setOpen(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
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
    onActive();
    handleStillHere();
  };

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
  const seconds = timeTillPrompt > 1 ? "seconds" : "second";

  return (
    <Modal
      isOpen={open}
      ctaLabel="Still Here"
      ctaHandleClick={handleCloseModal}
      closeModal={handleCloseModal}
      heading="Are you still there?"
      text={`You will be logged out in ${timeToLogout} seconds`}
    />
  );
};

IdleTimer.propTypes = {
  // Add propTypes here
};

IdleTimer.defaultProps = {
  // Add defaultProps here
};
