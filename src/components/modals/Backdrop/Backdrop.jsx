import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Modal } from "../Modal";
import { Icon } from "../../icons";
import { Button } from "../../buttons";
import { Error } from "../../errors";
import { Loading } from "../../loaders/";

import "./backdrop.scss";
import classNames from "classnames";

/**
 * Backdrop
 *
 * Backdrop component
 *
 * @return {jsx}
 */
export const Backdrop = ({
  isOpen,
  onClose,
  classes,
  heading,
  text,
  ctaLabel,
  ctaHandleClick,
  isCtaDisabled,
  isSecondaryCtaDisabled,
  secondaryCtaLabel,
  secondaryCtaHandleClick,
  secondaryCtaType = "ghost",
  ctaColor = "green",
  secondaryCtaColor = "green",
  showLoadingIfDisabled = false,
  children,
  errorMessage,
  reference,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const { width } = useWindowDimensions();
  const hasButtons = ctaLabel || secondaryCtaLabel;

  const handleClose = () => {
    onClose();
  };

  return width < 768 ? (
    <>
      <div
        className={`backdrop__overlay ${
          isOpen ? "backdrop__overlay--shown" : ""
        }`}
        onClick={handleClose}
      />
      <div
        className={[
          "backdrop",
          isOpen ? "backdrop__shown" : "",
          classNames(classes),
        ].join(" ")}
      >
        <div className="backdrop__header">
          <h4 className="backdrop__header-text">{heading}</h4>
          <Icon
            size="md"
            name="close-x"
            color="#20809E"
            onClick={handleClose}
          />
        </div>

        {text && <p className="text backdrop__text">{text}</p>}

        <div
          className={[
            "backdrop__children",
            !hasButtons ? "backdrop__children--full-height" : "",
          ].join(" ")}
          ref={reference}
        >
          {children}
        </div>

        {hasButtons && (
          <div className="backdrop__buttons-container">
            {errorMessage ? <Error message={errorMessage} /> : null}
            {ctaLabel &&
              (isCtaDisabled && showLoadingIfDisabled ? (
                <Loading padding="2rem" size="md" />
              ) : (
                <Button
                  label={ctaLabel}
                  disabled={isCtaDisabled}
                  onClick={ctaHandleClick}
                  color={ctaColor}
                  size="lg"
                />
              ))}
            {secondaryCtaLabel &&
              (isSecondaryCtaDisabled && showLoadingIfDisabled ? (
                <Loading padding="2rem" size="md" />
              ) : (
                <Button
                  label={secondaryCtaLabel}
                  onClick={secondaryCtaHandleClick}
                  disabled={isSecondaryCtaDisabled}
                  size="lg"
                  type={secondaryCtaType}
                  color={secondaryCtaColor}
                />
              ))}
          </div>
        )}
      </div>
    </>
  ) : (
    <Modal
      {...{
        isOpen,
        closeModal: onClose,
        classes,
        heading,
        text,
        ctaLabel,
        ctaHandleClick,
        ctaColor,
        secondaryCtaColor,
        isCtaDisabled,
        secondaryCtaLabel,
        secondaryCtaHandleClick,
        errorMessage,
        secondaryCtaType,
        reference,
        isSecondaryCtaDisabled,
        showLoadingIfDisabled,
      }}
    >
      {children}
    </Modal>
  );
};

Backdrop.propTypes = {
  /**
   * Is the backdrop/modal open
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Function to be called when the backdrop/modal is closed
   */
  onClose: PropTypes.func.isRequired,

  /**
   * Additional classes to be added to the backdrop/modal
   */
  classes: PropTypes.string,

  /**
   * Heading of the backdrop/modal
   */
  heading: PropTypes.string,

  /**
   * Label of the CTA button
   * */
  ctaLabel: PropTypes.string,

  /**
   * Function to be called when the CTA button is clicked
   * */
  ctaHandleClick: PropTypes.func,

  /**
   * If the CTA button is disabled
   */
  isCtaDisabled: PropTypes.bool,

  /**
   * If the secondary CTA button is disabled
   */
  isSecondaryCtaDisabled: PropTypes.bool,

  /**
   * If true and the CTA button is disabled, a loading spinner will be shown instead
   */
  showLoadingIfDisabled: PropTypes.bool,

  /**
   * Label of the secondary CTA button
   */
  secondaryCtaLabel: PropTypes.string,

  /**
   * Function to be called when the secondary CTA button is clicked
   */
  secondaryCtaHandleClick: PropTypes.func,

  /**
   * Type of the secondary CTA button
   */
  secondaryCtaType: PropTypes.oneOf([
    "primary",
    "secondary",
    "ghost",
    "text",
    "link",
  ]),

  /**
   * Error message to be displayed
   */
  errorMessage: PropTypes.string,

  /**
   * Children to be rendered in the backdrop/modal
   */
  children: PropTypes.node,
};
