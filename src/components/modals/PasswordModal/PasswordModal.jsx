import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Error } from "../../errors";
import { Input } from "../../inputs";

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
  placeholder,
}) => {
  const [password, setPassword] = useState("");
  return (
    <Modal
      overlayClasses="password-modal"
      isOpen={isOpen}
      closeModal={() => window.history.back()}
      ctaLabel={btnLabel}
      ctaHandleClick={() => handleSubmit(password)}
      errorMessage={error}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(password);
        }}
      >
        <Input
          type="password"
          placeholder={placeholder}
          label={label}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
