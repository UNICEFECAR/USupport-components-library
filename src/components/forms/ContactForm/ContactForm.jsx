import React, { useState } from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import classNames from "classnames";
import { Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import { Textarea } from "../../inputs/Textarea";
import { DropdownWithLabel } from "../../dropdowns/DropdownWithLabel";
import { Modal } from "../../modals/Modal";
import { validate, validateProperty } from "../../../utils";
import { Error } from "../../errors/Error";

import "./contact-form.scss";
import { useEffect } from "react";

const initialData = {
  email: "",
  reason: null,
  message: "",
};

/**
 * ContactForm
 *
 * Contact form that will be used in all platforms
 *
 * @return {jsx}
 */
export const ContactForm = ({
  classes,
  sendEmail,
  navigate,
  submitError,
  isMutating,
  isSuccessModalOpen,
  closeSuccessModal,
  t,
}) => {
  const initialReasons = [
    { value: "information", label: t("contact_reason_1") },
    { value: "technical-problem", label: t("contact_reason_2") },
    { value: "join-as-provider", label: t("contact_reason_3") },
    { value: "partnerships", label: t("contact_reason_4") },
    { value: "other", label: t("contact_reason_5") },
  ];
  const [data, setData] = useState(initialData);
  const [reasons, setReasons] = useState(initialReasons);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSuccessModalOpen) {
      setData(initialData);
      setReasons(initialReasons);
    }
  }, [isSuccessModalOpen]);

  const handleEmailSuccessCtaClick = () => {
    closeSuccessModal();
    navigate(`/${localStorage.getItem("language")}`);
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label(t("email_error")),
    reason: Joi.string().label(t("reason_error")),
    message: Joi.string().min(5).label(t("message_error")),
  });

  const handleChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const handleBlur = async (field, value) => {
    await validateProperty(field, value, schema, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((await validate(data, schema, setErrors)) == null) {
      const payload = {
        subjectValue: data.reason,
        subjectLabel: t("contact_form"),
        email: data.email.toLowerCase(),
        title: reasons.find((reason) => reason.value === data.reason).label,
        text: data.message,
      };
      await sendEmail(payload);
    }
  };

  return (
    <div className={["contact-form", classNames(classes)].join(" ")}>
      <h4 className="contact-form__heading">{t("contact_form_heading")}</h4>
      <Input
        label={t("email_label")}
        errorMessage={errors.email}
        value={data.email}
        classes="contact-form__email-input"
        placeholder="name@mail.com"
        onChange={(newEmail) => {
          handleChange("email", newEmail.currentTarget.value);
        }}
        onBlur={(newEmail) => {
          handleBlur("email", newEmail.currentTarget.value);
        }}
      />
      <DropdownWithLabel
        options={reasons}
        selected={data.reason}
        setSelected={(reason) => handleChange("reason", reason)}
        errorMessage={errors.reason}
        label={t("reason_label")}
        classes="contact-form__subject"
        placeholder={t("contact_reason_placeholder")}
      />
      <Textarea
        label={t("message_label")}
        value={data.message}
        errorMessage={errors.message}
        classes="contact-form__message"
        placeholder={t("message_placeholder")}
        onChange={(newMessage) => {
          handleChange("message", newMessage);
        }}
        onBlur={(newMessage) => {
          handleBlur("message", newMessage.currentTarget.value);
        }}
      />
      <Button
        label={t("send_button")}
        size="lg"
        loading={isMutating}
        classes="contact-form__button"
        onClick={handleSubmit}
      />
      {errors.submit || submitError ? (
        <Error message={errors.submit || submitError} />
      ) : null}
      <p className="small-text contact-form__reply-time">{t("paragraph")}</p>
      <Modal
        isOpen={isSuccessModalOpen}
        closeModal={closeSuccessModal}
        heading={t("modal_title")}
        text={t("modal_text")}
        ctaLabel={t("modal_cta_label")}
        ctaHandleClick={handleEmailSuccessCtaClick}
      />
    </div>
  );
};

ContactForm.propTypes = {
  /**
   * Additional classes to be added to the Contact Form
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Function to send email
   * */
  sendEmail: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
  classes: "",
};
