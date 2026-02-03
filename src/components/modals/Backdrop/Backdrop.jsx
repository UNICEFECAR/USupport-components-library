import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Modal } from "../Modal";
import { Icon } from "../../icons";
import { NewButton } from "../../buttons";
import { Error } from "../../errors";
import { Loading } from "../../loaders/";
import { ThemeContext } from "../../../utils";

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
  isCtaLoading = false,
  isSecondaryCtaDisabled,
  secondaryCtaLabel,
  secondaryCtaHandleClick,
  secondaryCtaType = "ghost",
  isSecondaryCtaLoading = false,
  ctaColor = "green",
  secondaryCtaColor = "green",
  showLoadingIfDisabled = false,
  children,
  errorMessage,
  reference,
  headingComponent = null,
  showAlwaysAsBackdrop = false,
  customButton,
  thirdCtaLabel,
  thirdCtaHandleClick,
  isThirdCtaDisabled,
  hasCloseIcon = true,
  hasGoBackArrow = false,
  handleGoBack = () => {},
}) => {
  const { theme } = useContext(ThemeContext);

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
  const hasButtons = ctaLabel || secondaryCtaLabel || thirdCtaLabel;

  const handleClose = () => {
    onClose();
  };

  return width < 768 || showAlwaysAsBackdrop ? (
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
          `theme-${theme}`,
          isOpen ? "backdrop__shown" : "",
          theme !== "light" ? "backdrop--dark" : "",
          classNames(classes),
        ].join(" ")}
      >
        <div
          className={[
            "backdrop__header",
            !hasGoBackArrow && !hasCloseIcon && "backdrop__header--no-close",
          ].join(" ")}
        >
          {(hasGoBackArrow || hasCloseIcon) && (
            <div className="backdrop__header__left-container">
              {hasGoBackArrow && (
                <Icon
                  name="arrow-chevron-back"
                  size="md"
                  onClick={handleGoBack}
                />
              )}
            </div>
          )}
          {headingComponent || (
            <h4
              className={[
                "backdrop__header__text",
                theme === "dark" && "backdrop__header__text--dark",
              ].join(" ")}
            >
              {heading}
            </h4>
          )}
          {(hasGoBackArrow || hasCloseIcon) && (
            <div className="backdrop__header__icon-container">
              {hasCloseIcon && (
                <Icon
                  name="close-x"
                  size="md"
                  onClick={handleClose}
                  color={theme === "dark" ? "#c1d7e0" : "#20809E"}
                />
              )}
            </div>
          )}
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
          <div className="backdrop__footer-wrapper">
            <div className="base-modal__footer">
              {errorMessage ? <Error message={errorMessage} /> : null}
              {customButton}
              {ctaLabel &&
                (isCtaDisabled && showLoadingIfDisabled ? (
                  <Loading padding="2rem" size="md" />
                ) : (
                  <NewButton
                    label={ctaLabel}
                    disabled={isCtaDisabled}
                    onClick={ctaHandleClick}
                    loading={isCtaLoading}
                  />
                ))}
              {secondaryCtaLabel &&
                (isSecondaryCtaDisabled && showLoadingIfDisabled ? (
                  <Loading padding="2rem" size="md" />
                ) : (
                  <NewButton
                    label={secondaryCtaLabel}
                    onClick={secondaryCtaHandleClick}
                    disabled={isSecondaryCtaDisabled}
                    loading={isSecondaryCtaLoading}
                    type="outline"
                  />
                ))}
            </div>
            {thirdCtaLabel && (
              <NewButton
                label={thirdCtaLabel}
                onClick={thirdCtaHandleClick}
                classes="base-modal__footer__third-cta"
                type="text"
                size="sm"
                disabled={isThirdCtaDisabled}
              />
            )}
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
        isCtaLoading,
        isCtaDisabled,
        secondaryCtaLabel,
        secondaryCtaHandleClick,
        isSecondaryCtaLoading,
        errorMessage,
        secondaryCtaType,
        reference,
        isSecondaryCtaDisabled,
        showLoadingIfDisabled,
        headingComponent,
        customButton,
        thirdCtaLabel,
        thirdCtaHandleClick,
        thirdCtaDisabled: isThirdCtaDisabled,
        hasCloseIcon,
        hasGoBackArrow,
        handleGoBack,
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
   * Custom button to be rendered in the backdrop/modal
   */
  customButton: PropTypes.node,

  /**
   * Children to be rendered in the backdrop/modal
   */
  children: PropTypes.node,

  /**
   * Whether to show the close icon
   */
  hasCloseIcon: PropTypes.bool,

  /**
   * Whether to show the go back arrow
   */
  hasGoBackArrow: PropTypes.bool,

  /**
   * Function to be called when the go back arrow is clicked
   */
  handleGoBack: PropTypes.func,
};
