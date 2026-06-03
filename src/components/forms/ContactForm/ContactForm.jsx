import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import classNames from "classnames";
import { NewButton } from "../../buttons/Button/NewButton";
import { Input } from "../../inputs/Input";
import { Textarea } from "../../inputs/Textarea";
import { DropdownWithLabel } from "../../dropdowns/DropdownWithLabel";
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
  submitError,
  isMutating,
  isSuccessModalOpen,
  t,
  country,
  initialEmail,
  initialReason,
  reasonOptions,
  subjectLabel,
  hideHeading,
  hideSubmitButton,
  formRef,
}) => {
  const IS_PL = country === "PL";
  const IS_RO = country === "RO";

  const initialReasons = useMemo(() => {
    if (reasonOptions) {
      return reasonOptions;
    }
    return [
      {
        value: "information",
        label: t(IS_PL ? "contact_reason_1_pl" : "contact_reason_1"),
      },
      {
        value: "technical-problem",
        label: t(IS_PL ? "contact_reason_2_pl" : "contact_reason_2"),
      },
      {
        value: "join-as-provider",
        label: t(
          IS_RO
            ? "contact_reason_3_ro"
            : IS_PL
              ? "contact_reason_3_pl"
              : "contact_reason_3",
        ),
      },
      {
        value: "partnerships",
        label: t(IS_PL ? "contact_reason_4_pl" : "contact_reason_4"),
      },
      ...(!IS_PL
        ? [
            {
              value: "other",
              label: t("contact_reason_5"),
            },
          ]
        : []),
    ];
  }, [t, IS_PL, IS_RO, reasonOptions]);

  const lockedReason =
    reasonOptions?.length === 1 ? reasonOptions[0].value : null;

  const [data, setData] = useState({
    ...initialData,
    email: initialEmail ?? initialData.email,
    reason: lockedReason ?? initialReason ?? initialData.reason,
  });
  const [reasons, setReasons] = useState(initialReasons);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      email: initialEmail ?? prev.email,
      reason: lockedReason ?? initialReason ?? prev.reason,
    }));
  }, [initialEmail, initialReason, lockedReason]);

  useEffect(() => {
    if (isSuccessModalOpen) {
      setData({
        ...initialData,
        email: initialEmail ?? initialData.email,
        reason: lockedReason ?? initialReason ?? initialData.reason,
      });
      setReasons(initialReasons);
    }
  }, [isSuccessModalOpen, initialEmail, initialReason, lockedReason, initialReasons]);

  useEffect(() => {
    setReasons(initialReasons);
  }, [t]);

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
    e?.preventDefault();
    if ((await validate(data, schema, setErrors)) == null) {
      const selectedReason = reasons.find(
        (reason) => reason.value === data.reason,
      );
      const payload = {
        subjectValue: data.reason,
        subjectLabel: subjectLabel ?? t("contact_form"),
        email: data.email.toLowerCase(),
        title: selectedReason?.label ?? data.reason,
        text: data.message,
      };
      await sendEmail(payload);
    }
  };

  return (
    <form
      ref={formRef}
      className={["contact-form", classNames(classes)].join(" ")}
      onSubmit={handleSubmit}
    >
      {!hideHeading && (
        <h4 className="contact-form__heading">{t("contact_form_heading")}</h4>
      )}
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
        disabled={!!lockedReason}
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
      {!hideSubmitButton && (
        <NewButton
          label={t("send_button")}
          size="lg"
          isFullWidth
          loading={isMutating}
          isSubmit
        />
      )}
      {submitError ? <Error message={submitError} /> : null}
    </form>
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
  submitError: PropTypes.string,
  isMutating: PropTypes.bool,
  isSuccessModalOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  initialEmail: PropTypes.string,
  initialReason: PropTypes.string,
  subjectLabel: PropTypes.string,
  reasonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  hideHeading: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

ContactForm.defaultProps = {
  classes: "",
  submitError: "",
  isMutating: false,
  isSuccessModalOpen: false,
  country: "",
  initialEmail: "",
  initialReason: null,
  reasonOptions: undefined,
  hideHeading: false,
  hideSubmitButton: false,
  formRef: undefined,
};
