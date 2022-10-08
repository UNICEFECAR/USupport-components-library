import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button";
import { Input } from "../../inputs/Input";
import { TextArea } from "../../inputs/TextArea";
import { DropdownWithLabel } from "../../dropdowns/DropdownWithLabel";
import "./contact-form.scss";
import classNames from "classnames";

/**
 * ContactForm
 *
 * Contact form that will be used in all platforms
 *
 * @return {jsx}
 */
export const ContactForm = ({ classes }) => {
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

  const handleChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={["contact-form", classNames(classes)].join(" ")}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          onChange={(value) => handleChange("email", value)}
          errorMessage={errors.email}
          classes="contact-form__email-input"
          placeholder="name@mail.com"
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
          onChange={(value) => handleChange("message", value)}
          classes="contact-form__message"
          placeholder="Your message to us"
        />
        <Button label="Send" size="lg" classes="contact-form__button" />
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
};

ContactForm.defaultProps = {
  classes: "",
};
