import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./backdrop.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Modal } from "../Modal/Modal";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";

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
  title,
  cta = true,
  ctaLabel,
  ctaHandleClick,
  secondaryCta = true,
  secondaryCtaLabel,
  secondaryCtaHandleClick,
  children,
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
  const hasButtons = cta || secondaryCta;

  const handleClose = () => {
    onClose();
  };

  return width < 768 ? (
    <div className={`backdrop ${isOpen ? "backdrop__shown" : ""}`}>
      <div className="backdrop__header">
        <h4 className="backdrop__header-title">{title}</h4>
        <Icon size="md" name="close-x" color="#20809E" onClick={handleClose} />
      </div>
      <div
        className={[
          "backdrop__children",
          !hasButtons ? "backdrop__children--full-height" : "",
        ].join(" ")}
      >
        {children}
      </div>
      {hasButtons && (
        <div className="backdrop__buttons-container">
          {cta && (
            <Button
              label={ctaLabel}
              onClick={ctaHandleClick}
              color="green"
              size="lg"
              type="primary"
            />
          )}
          {secondaryCta && (
            <Button
              label={secondaryCtaLabel}
              onClick={secondaryCtaHandleClick}
              color="green"
              size="lg"
              type="ghost"
            />
          )}
        </div>
      )}
    </div>
  ) : (
    <Modal
      {...{
        isOpen,
        closeModal: onClose,
        classes,
        title,
        text,
        cta,
        ctaLabel,
        ctaHandleClick,
        secondaryCta,
        secondaryCtaLabel,
        secondaryCtaHandleClick,
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
   * Title of the backdrop/modal
   */
  title: PropTypes.string,

  /**
   * Should the backdrop/modal have a CTA button
   * */
  cta: PropTypes.bool,

  /**
   * Label of the CTA button
   * */
  ctaLabel: PropTypes.string,

  /**
   * Function to be called when the CTA button is clicked
   * */
  ctaHandleClick: PropTypes.func,

  /**
   * Should the backdrop/modal have a secondary CTA button
   */
  secondaryCta: PropTypes.bool,

  /**
   * Label of the secondary CTA button
   */
  secondaryCtaLabel: PropTypes.string,

  /**
   * Function to be called when the secondary CTA button is clicked
   */
  secondaryCtaHandleClick: PropTypes.func,

  /**
   * Children to be rendered in the backdrop/modal
   */
  children: PropTypes.node,
};

Backdrop.defaultProps = {
  title: "Specialist filter",
  ctaLabel: "Button",
  secondaryCtaLabel: "Secondary button",
};
