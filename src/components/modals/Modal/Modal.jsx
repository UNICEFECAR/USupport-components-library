import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { default as ModalPackage } from "react-modal";

import { Icon } from "../../icons/";
import { NewButton } from "../../buttons/";
import { Error } from "../../errors";
import { Loading } from "../../loaders/";
import { ThemeContext, useScrollLock } from "../../../utils";

import "./modal.scss";

/**
 * Modal
 *
 * A base modal
 *
 * @return {jsx}
 */
export const Modal = ({
  isOpen,
  closeModal = () => {},
  classes,
  heading,
  text,
  ctaLabel,
  ctaHandleClick,
  isCtaDisabled,
  isCtaLoading,
  secondaryCtaLabel,
  secondaryCtaHandleClick,
  isSecondaryCtaLoading,
  isSecondaryCtaDisabled,
  showLoadingIfDisabled = false,
  hasCloseIcon = true,
  children,
  errorMessage,
  reference,
  overlayClasses,
  headingComponent,
  customButton,
  hasGoBackArrow = false,
  handleGoBack = () => {},
  thirdCtaLabel,
  thirdCtaHandleClick,
  thirdCtaDisabled,
  removeTopPadding = false,
  topHeaderComponent,
}) => {
  const { theme } = useContext(ThemeContext);
  const hasButtons = ctaLabel || secondaryCtaLabel || thirdCtaLabel;

  // Always prevent background page scroll while any modal is open.
  useScrollLock(isOpen);

  return (
    <ModalPackage
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={[
        "base-modal__overlay",
        `theme-${theme}`,
        classNames(overlayClasses),
      ].join(" ")}
      className={[
        "base-modal",
        `theme-${theme}`,
        theme === "dark"
          ? "base-modal--dark"
          : theme === "highContrast"
            ? "base-modal--hc"
            : "",
        removeTopPadding && "base-modal--no-top-padding",
        classNames(classes),
      ].join(" ")}
      contentLabel="Base Modal"
      appElement={document.getElementById("root")}
    >
      {topHeaderComponent && (
        <div className="base-modal__top-header">
          {hasGoBackArrow && handleGoBack && (
            <div className="base-modal__top-header__go-back-icon">
              <Icon
                name="arrow-chevron-back"
                size="md"
                onClick={handleGoBack}
                color={theme === "dark" ? "#c1d7e0" : undefined}
              />
            </div>
          )}
          {topHeaderComponent}
        </div>
      )}
      {(hasGoBackArrow || headingComponent || heading) && !topHeaderComponent && (
        <div
          className={[
            "base-modal__header",
            !hasGoBackArrow && "base-modal__header--no-close",
          ].join(" ")}
        >
          <div className="base-modal__header__left-container">
            {hasGoBackArrow && (
              <Icon name="arrow-chevron-back" size="md" onClick={handleGoBack} />
            )}
          </div>
          {headingComponent || (
            <h4
              className={[
                "base-modal__header__text",
                theme === "dark" && "base-modal__header__text--dark",
              ].join(" ")}
            >
              {heading}
            </h4>
          )}
          <div className="base-modal__header__right-spacer" />
        </div>
      )}
      {hasCloseIcon && !topHeaderComponent && (
        <div className="base-modal__close-icon">
          <Icon
            name="close-x"
            size="md"
            onClick={closeModal}
            color={theme === "dark" ? "#c1d7e0" : undefined}
          />
        </div>
      )}
      {text && <p className="text base-modal__text">{text}</p>}
      <div
        className={[
          "base-modal__body",
          !hasButtons ? "backdrop__children--full-height" : "",
        ].join(" ")}
        ref={reference}
      >
        {children}
      </div>
      {hasButtons && (
        <div className="base-modal__footer-wrapper">
          <div className="base-modal__footer">
            {errorMessage ? <Error message={errorMessage} /> : null}
            {customButton}
            {ctaLabel &&
              (isCtaDisabled && showLoadingIfDisabled ? (
                <Loading padding="2rem" size="md" />
              ) : (
                <NewButton
                  label={ctaLabel}
                  // type={ctaType}
                  disabled={isCtaDisabled}
                  onClick={ctaHandleClick}
                  loading={isCtaLoading}
                  // color={ctaColor}
                  size="lg"
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
                  size="lg"
                  type="outline"
                  // type={secondaryCtaType}
                  // color={secondaryCtaColor}
                />
              ))}
          </div>
          {thirdCtaLabel && (
            <NewButton
              label={thirdCtaLabel}
              onClick={thirdCtaHandleClick}
              classes="base-modal__footer__third-cta"
              type="text"
              disabled={thirdCtaDisabled}
            />
          )}
        </div>
      )}
    </ModalPackage>
  );
};

Modal.propTypes = {
  /**
   * Is the modal open
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Function to close the modal
   * */
  closeModal: PropTypes.func,

  /**
   * Additional classes to add to the modal
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * heading of the modal
   * */
  heading: PropTypes.string,

  /**
   * Text to be displayed in the modal
   * */
  text: PropTypes.string,

  /**
   * Label of the CTA button
   * */
  ctaLabel: PropTypes.string,

  /**
   * Function to be called when the CTA button is clicked
   * */
  ctaHandleClick: PropTypes.func,

  /**
   * Is the CTA button disabled
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
   * Children to be rendered in the modal
   */
  children: PropTypes.node,

  /**
   * If true, removes the top padding from the modal
   */
  removeTopPadding: PropTypes.bool,
};

Modal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  classes: "",
  secondaryCtaType: "ghost",
};
