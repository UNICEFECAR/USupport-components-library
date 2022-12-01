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

const initialReasons = [
  { label: "Reason 1", value: "reason1" },
  { label: "Reason 2", value: "reason2" },
  { label: "Reason 3", value: "reason3" },
  { label: "Reason 4", value: "reason4" },
  { label: "Reason 5", value: "reason5" },
];

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
export const ContactForm = ({ classes, sendEmail, navigate }) => {
  const [data, setData] = useState(initialData);
  const [reasons, setReasons] = useState(initialReasons);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessEmailModalOpen, setIsSuccessEmailModalOpen] = useState(false);

  const closeSuccessEmailModal = () => setIsSuccessEmailModalOpen(false);

  const handleEmailSuccessCtaClick = () => {
    closeSuccessEmailModal();
    navigate("/");
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Please enter your email address"),
    reason: Joi.string().label("Please select a reason"),
    message: Joi.string().min(5).label("Please enter your message"),
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
    if (!isSubmitting) {
      if ((await validate(data, schema, setErrors)) == null) {
        setIsSubmitting(true);

        await sendEmail(data).then((raw) => {
          if (raw.status < 400) {
            setIsSuccessEmailModalOpen(true);
            setData(initialData);
            setReasons(initialReasons);
          } else {
            setErrors({ submit: raw.data.error.message });
            setIsSubmitting(false);
          }
        });

        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={["contact-form", classNames(classes)].join(" ")}>
      <Input
        label="Email"
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
        label="Subject for contacting us"
        classes="contact-form__subject"
        placeholder="Select a reason"
      />
      <Textarea
        label="Message"
        value={data.message}
        errorMessage={errors.message}
        classes="contact-form__message"
        placeholder="Your message to us"
        onChange={(newMessage) => {
          handleChange("message", newMessage);
        }}
        onBlur={(newMessage) => {
          handleBlur("message", newMessage.currentTarget.value);
        }}
      />
      <Button
        label="Send"
        size="lg"
        disabled={isSubmitting}
        classes="contact-form__button"
        onClick={handleSubmit}
      />
      {errors.submit ? <Error message={errors.submit} /> : null}
      <p className="small-text contact-form__reply-time">
        We will reply to your email in 24 hours. Make sure you enter your email
        address correctly
      </p>
      <Modal
        isOpen={isSuccessEmailModalOpen}
        closeModal={closeSuccessEmailModal}
        heading="Your message was successfully sent"
        text="We will get back to you as soon as possible"
        ctaLabel="Go back to Home"
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
