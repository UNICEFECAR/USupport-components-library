import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../modals/Modal/Modal";
import { Textarea } from "../../inputs/Textarea/Textarea";
import { useMutation } from "@tanstack/react-query";
import providerSvc from "../../../services/provider";
import {
  collectReportEnvironment,
  createReportKey,
} from "../../../utils/reportEnvironment";
import "./report-problem.scss";

export const ReportProblem = ({
  isOpen,
  onClose,
  consultationId,
  getCallContext,
}) => {
  const { t, i18n } = useTranslation("consultationReport");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const payload = useRef(null);
  const mutation = useMutation(
    (data) => providerSvc.submitProblemReport(data),
    { onSuccess: () => setSent(true) }
  );
  const close = () => {
    if (!mutation.isLoading) onClose();
  };
  const submit = () => {
    if (mutation.isLoading || !message.trim()) return;
    // Freeze the payload for retries, including the submission-time call context.
    payload.current ||= {
      consultationId,
      idempotencyKey: createReportKey(),
      message: message.trim(),
      ...collectReportEnvironment(),
      interfaceLanguage: (i18n.resolvedLanguage || i18n.language || "en").slice(
        0,
        16
      ),
      callContext: getCallContext(),
    };
    mutation.mutate(payload.current);
  };
  return (
    <Modal
      isOpen={isOpen}
      heading={t(sent ? "success_title" : "title")}
      closeModal={close}
      ctaLabel={t(sent ? "close" : "send")}
      ctaHandleClick={sent ? close : submit}
      isCtaLoading={mutation.isLoading}
      isCtaDisabled={!sent && (!message.trim() || mutation.isLoading)}
      errorMessage={mutation.isError ? t("error") : undefined}
      classes="consultation-report-modal"
    >
      {sent ? (
        <p role="status">{t("success")}</p>
      ) : (
        <div className="consultation-report-form">
          <Textarea
            label={t("message_label")}
            aria-label={t("message_label")}
            value={message}
            disabled={mutation.isLoading}
            onChange={(value) => {
              setMessage([...value].slice(0, 2000).join(""));
              payload.current = null;
              mutation.reset();
            }}
          />
        </div>
      )}
    </Modal>
  );
};
