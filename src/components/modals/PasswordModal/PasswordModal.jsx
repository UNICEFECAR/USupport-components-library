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
      <Input
        type="password"
        placeholder={label}
        label={label}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        classes="password-modal__input"
      />
    </Modal>
  );
};

PasswordModal.propTypes = {
  // Add propTypes here
};

PasswordModal.defaultProps = {
  // Add defaultProps here
};
