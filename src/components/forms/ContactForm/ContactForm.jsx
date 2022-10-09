import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import classNames from "classnames";
import { Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import { TextArea } from "../../inputs/TextArea";
import { DropdownWithLabel } from "../../dropdowns/DropdownWithLabel";
import { validate, validateProperty } from "../../../utils";

import "./contact-form.scss";
/**
 * ContactForm
 *
 * Contact form that will be used in all platforms
 *
 * @return {jsx}
 */
export const ContactForm = ({ classes, onServiceCall }) => {
  const [reasons, setReasons] = useState([
    { label: "Reason 1", selected: false },
    { label: "Reason 2", selected: false },
    { label: "Reason 3", selected: false },
    { label: "Reason 4", selected: false },
    { label: "Reason 5", selected: false },
  ]);

  const [data, setData] = useState({
    email: "",
    reason: null,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailWasSent, setEmailWasSent] = useState(false);

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Please enter your email address"),
    reason: Joi.object({ label: Joi.string(), selected: Joi.boolean() }).label(
      "Please select a reason"
    ),
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

  const handleReasonChange = (reason) => {
    const reasonsCopy = [...reasons];
    for (let i = 0; i < reasonsCopy.length; i++) {
      if (reasonsCopy[i].label === reason.label) {
        reasonsCopy[i].selected = true;
      } else {
        reasonsCopy[i].selected = false;
      }
    }
    setReasons(reasonsCopy);
    setData({
      ...data,
      reason,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      if ((await validate(data, schema, setErrors)) == null) {
        setIsSubmitting(true);
        const reasonLabel = data.reason.label;
        if (await onServiceCall(data)) {
          setEmailWasSent(true);
        } else {
          setErrors({
            message: "There was a problem sending the email, please try again",
          });
        }

        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={["contact-form", classNames(classes)].join(" ")}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          errorMessage={errors.email}
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
          setSelected={handleReasonChange}
          errorMessage={errors.reason}
          label="Subject for contacting us"
          classes="contact-form__subject"
          placeholder="Select a reason"
        />
        <TextArea
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
        {emailWasSent ? (
          <h4 className="contact-form__success-heading">
            Your message was sent.
          </h4>
        ) : (
          <Button
            label="Send"
            size="lg"
            disabled={isSubmitting}
            classes="contact-form__button"
          />
        )}
        <p className="small-text contact-form__reply-time">
          We will reply to your email in 24 hours. Make sure you enter your
          email address correctly
        </p>
      </form>
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
   * Function that will be called when the form is submitted
   * @param {object} data - The data that was entered in the form
   * @return {boolean} - True if the email was sent successfully, false otherwise
   * */
  onServiceCall: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
  classes: "",
};
