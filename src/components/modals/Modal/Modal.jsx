import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { default as ModalPackage } from "react-modal";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";

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
  closeModal,
  classes,
  title,
  text,
  ctaLabel,
  ctaHandleClick,
  secondaryCtaLabel,
  secondaryCtaHandleClick,
  children,
}) => {
  const hasButtons = ctaLabel || secondaryCtaLabel;

  return (
    <ModalPackage
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="base-modal__overlay"
      className={["base-modal", classNames(classes)].join(" ")}
      bodyOpenClassName="base-modal--open"
      contentLabel="Base Modal"
      appElement={document.getElementById("root")}
    >
      <div className="base-modal__header">
        <h4 className="base-modal__header__title">{title}</h4>
        <Icon name="close-x" size="md" onClick={closeModal} />
      </div>
      {text && <p className="text base-modal__text">{text}</p>}
      <div
        className={[
          "base-modal__body",
          !hasButtons ? "backdrop__children--full-height" : "",
        ].join(" ")}
      >
        {children}
      </div>
      {hasButtons && (
        <div className="base-modal__footer">
          {ctaLabel && (
            <Button label={ctaLabel} onClick={ctaHandleClick} size="lg" />
          )}
          {secondaryCtaLabel && (
            <Button
              label={secondaryCtaLabel}
              onClick={secondaryCtaHandleClick}
              size="lg"
              type="ghost"
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
  closeModal: PropTypes.func.isRequired,

  /**
   * Additional classes to add to the modal
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Title of the modal
   * */
  title: PropTypes.string,

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
   * Label of the secondary CTA button
   */
  secondaryCtaLabel: PropTypes.string,

  /**
   * Function to be called when the secondary CTA button is clicked
   */
  secondaryCtaHandleClick: PropTypes.func,

  /**
   * Children to be rendered in the modal
   */
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  classes: "",
};
