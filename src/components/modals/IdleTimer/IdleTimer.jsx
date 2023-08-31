import React, { useState, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Modal } from "../Modal";
import { FIVE_MINUTES } from "../../../utils";

import { userSvc } from "@USupport-components-library/services";

import "./idle-timer.scss";

const timeout = FIVE_MINUTES * 4;
// const timeout = FIVE_MINUTES;
// const timeout = 50_000;

/**
 * IdleTimer
 *
 * Idle timer
 *
 * @return {jsx}
 */
export const IdleTimer = ({ setLoggedIn, t, NavigateComponent }) => {
  const [open, setOpen] = useState(false);

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

  const [returnNavigate, setReturnNavigate] = useState(false);

  const timeoutRef = useRef();
  const handleLogout = () => {
    timeoutRef.current = null;
    userSvc.logout();
    setLoggedIn(false);
    setReturnNavigate(true);
  };

  const [timeToLogout, setTimeToLogout] = useState(20);

  useEffect(() => {
    let lastOpenTime = localStorage.getItem("usupport_lot");

    if (!lastOpenTime) {
      lastOpenTime = new Date().getTime();
    } else {
      lastOpenTime = new Date(Number(lastOpenTime)).getTime();
    }
    localStorage.setItem("usupport_lot", new Date().getTime());

    const now = new Date().getTime();

    const timeAtWhichShouldLogout = new Date(lastOpenTime + timeout);
    if (now >= timeAtWhichShouldLogout.getTime()) {
      localStorage.removeItem("usupport_lot");
      handleLogout();
    }

    return () => localStorage.removeItem("usupport_lot");
  }, []);

  const [isTabFocused, setIsTabFocused] = useState(true);

  const onFocus = () => setIsTabFocused(true);
  const onBlur = () => setIsTabFocused(false);

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const lastOpenTime = localStorage.getItem("usupport_lot");
      if (lastOpenTime) {
        const now = new Date().getTime();

        const timeAtWhichShouldLogout = new Date(lastOpenTime + timeout);
        if (now >= timeAtWhichShouldLogout.getTime()) {
          localStorage.removeItem("usupport_lot");
          handleLogout();
        }
      }
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
  }, [open, isTabFocused]);

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

  if (returnNavigate) return <NavigateComponent />;

  return (
    <Modal
      isOpen={open}
      ctaLabel={t("cta")}
      ctaHandleClick={handleStillHere}
      heading={t("heading")}
      text={t("text", { seconds: timeToLogout })}
      overlayClasses="idle-timer"
      hasCloseIcon={false}
    />
  );
};
