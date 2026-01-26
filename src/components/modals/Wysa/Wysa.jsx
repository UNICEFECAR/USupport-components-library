import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Icon, Loading } from "@USupport-components-library/src";
import { ThemeContext } from "@USupport-components-library/utils";

import "./wysa.scss";

/**
 * Wysa Modal
 * 
 * Full-screen modal for Wysa widget
 * 
 * @return {JSX.Element}
 */
export const Wysa = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const loadTimeoutRef = useRef(null);
  const minLoadTimeoutRef = useRef(null);
  const iframeLoadedRef = useRef(false);
  const modalRef = useRef(null);
  const originalBodyOverflowRef = useRef(null);
  const originalHtmlOverflowRef = useRef(null);
  const { theme } = React.useContext(ThemeContext);

  const MIN_LOADING_TIME = 2000; // 3 seconds

  const handleIframeLoad = () => {
    iframeLoadedRef.current = true;
    // Only hide loading if minimum time has passed (minLoadTimeoutRef will be null after 3 seconds)
    if (!minLoadTimeoutRef.current) {
      setIsLoading(false);
      setTimeout(() => {
        setIsOpened(true);
      }, 400);
    }
    // If minimum time hasn't passed yet, the timeout in useEffect will handle hiding the loading
  };

  const handleIframeError = () => {
    iframeLoadedRef.current = true;
    // Only hide loading if minimum time has passed (minLoadTimeoutRef will be null after 3 seconds)
    if (!minLoadTimeoutRef.current) {
      setIsLoading(false);
    }
    // If minimum time hasn't passed yet, the timeout in useEffect will handle hiding the loading
  };

  const handleClose = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    if (minLoadTimeoutRef.current) {
      clearTimeout(minLoadTimeoutRef.current);
      minLoadTimeoutRef.current = null;
    }
    setIsOpened(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsLoading(true);
      iframeLoadedRef.current = false;
      onClose();
    }, 350);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen && !isClosing) {
      handleClose();
    }
  };

  const preventScroll = (e) => {
    // Prevent scrolling when modal is open
    if (isOpen && !isClosing) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIsClosing(false);
      setIsOpened(false);
      iframeLoadedRef.current = false;
      
      // Store original overflow values
      originalBodyOverflowRef.current = document.body.style.overflow;
      originalHtmlOverflowRef.current = document.documentElement.style.overflow;
      
      // Prevent scrolling on body and html
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      
      // Set minimum loading time of 3 seconds
      minLoadTimeoutRef.current = setTimeout(() => {
        minLoadTimeoutRef.current = null;
        // After minimum time, hide loading if iframe has loaded
        if (iframeLoadedRef.current) {
          setIsLoading(false);
          setTimeout(() => {
            setIsOpened(true);
          }, 400);
        }
      }, MIN_LOADING_TIME);
      
      // Fallback timeout (10 seconds) in case iframe never loads
      loadTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        loadTimeoutRef.current = null;
      }, 10000);
      
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scroll events
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      
      return () => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
          loadTimeoutRef.current = null;
        }
        if (minLoadTimeoutRef.current) {
          clearTimeout(minLoadTimeoutRef.current);
          minLoadTimeoutRef.current = null;
        }
        // Restore original overflow values
        document.body.style.overflow = originalBodyOverflowRef.current || "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.documentElement.style.overflow = originalHtmlOverflowRef.current || "";
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
      };
    } else {
      // Clean up timeouts when modal closes
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      if (minLoadTimeoutRef.current) {
        clearTimeout(minLoadTimeoutRef.current);
        minLoadTimeoutRef.current = null;
      }
      setIsOpened(false);
      iframeLoadedRef.current = false;
      // Restore original overflow values
      document.body.style.overflow = originalBodyOverflowRef.current || "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = originalHtmlOverflowRef.current || "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <>
      <div
        className={classNames("wysa-modal__overlay", {
          "wysa-modal__overlay--closing": isClosing,
        })}
        onClick={handleOverlayClick}
      />
      <div
        ref={modalRef}
        className={classNames("wysa-modal", {
          "wysa-modal--closing": isClosing,
          "wysa-modal--opened": isOpened && !isClosing,
          "wysa-modal--dark": theme === "dark",
          "wysa-modal--hc": theme === "highContrast",
        })}
        role="dialog"
        aria-modal="true"
        aria-label="Wysa Widget"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wysa-modal__header">
        <div className="wysa-modal__close-button">
            <Icon
              name="close-x"
              size="md"
              onClick={handleClose}
              color={theme === "dark" ? "#c1d7e0" : undefined}
            />
          </div>
          </div>
        <div className="wysa-modal__content">
          {isLoading && (
            <div className="wysa-modal__loader">
              <Loading size="lg" />
            </div>
          )}
          <iframe
            src="https://dev-web.wysa.io/?xtoken=tcisqgu&policy=premium"
            title="Wysa Widget"
            style={{
              border: "none",
              display: isLoading ? "none" : "block",
              width: "100%",
              height: "100%",
              flex: 1,
              overflow: "hidden",
            }}
            allow="microphone; camera"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      </div>
    </>
  );
};

Wysa.propTypes = {
  /**
   * Is the modal open
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function to close the modal
   */
  onClose: PropTypes.func.isRequired,
};

Wysa.defaultProps = {
  isOpen: false,
  onClose: () => {},
};