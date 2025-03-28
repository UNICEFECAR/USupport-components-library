import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { InputPassword } from "../../inputs";

import "./password-modal.scss";

/**
 * PasswordModal
 *
 * password modal
 *
 * @return {jsx}
 */
export const PasswordModal = ({
  isOpen,
  onClose,
  label,
  btnLabel,
  error,
  handleSubmit,
  isLoading,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  return null;
  return (
    <Modal
      overlayClasses="password-modal"
      isOpen={isOpen}
      closeModal={() => window.history.back()}
      ctaLabel={btnLabel}
      ctaHandleClick={() => handleSubmit(value)}
      errorMessage={error}
      isCtaLoading={isLoading}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(value);
        }}
      >
        <InputPassword
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label={label}
          placeholder={placeholder}
          classes="password-modal__input"
        />
        <button type="submit" className="password-modal__submit-button" />
      </form>
    </Modal>
  );
};

PasswordModal.propTypes = {
  // Add propTypes here
};

PasswordModal.defaultProps = {
  // Add defaultProps here
};
