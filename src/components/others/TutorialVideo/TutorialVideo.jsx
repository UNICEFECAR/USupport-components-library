import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { Modal } from "../../modals/Modal";
import { VideoPlayer } from "../VideoPlayer";

import { useGetTutorial } from "./useGetTutorial";

import "./tutorial-video.scss";

/**
 * TutorialVideo
 *
 * Shows a help button when a playable CMS tutorial is available.
 *
 * @return {jsx}
 */
export const TutorialVideo = ({
  tutorialKey,
  language,
  queryClient,
  isEnabled,
  platform = "client",
  ...props
}) => {
  if (!isEnabled) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TutorialVideoContent
        key={JSON.stringify([platform, tutorialKey, language])}
        tutorialKey={tutorialKey}
        language={language}
        platform={platform}
        {...props}
      />
    </QueryClientProvider>
  );
};

const TutorialVideoContent = ({
  tutorialKey,
  language,
  platform,
  i18n,
  label,
  classes = "",
  onClose,
}) => {
  const { t } = useTranslation("blocks", { i18n, keyPrefix: "tutorial-video" });
  const buttonLabel =
    label ||
    t(tutorialKey, {
      lng: language,
      defaultValue: t("label", { lng: language }),
    });
  const closeLabel = t("close", { lng: language });
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };
  const {
    data: tutorial,
    isError,
    isLoading,
  } = useGetTutorial(tutorialKey, language, platform);
  const video = tutorial?.video;
  const isPlayable =
    video?.hls_url && (!video.status || video.status === "ready");

  if (
    isLoading ||
    isError ||
    !isPlayable ||
    tutorial.key !== tutorialKey ||
    tutorial.locale !== language ||
    tutorial.platform !== platform
  ) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={classNames("tutorial-video__trigger", classes)}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8 6 4-6 4Z" />
        </svg>
        {buttonLabel}
      </button>
      {isOpen && (
        <Modal
          isOpen
          closeModal={closeModal}
          heading={buttonLabel}
          ctaLabel={closeLabel}
          ctaHandleClick={closeModal}
        >
          <VideoPlayer
            key={video.hls_url}
            url={video.hls_url}
            title={buttonLabel}
            hasCookies={false}
            autoplay
          />
        </Modal>
      )}
    </>
  );
};

const tutorialVideoPropTypes = {
  tutorialKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  platform: PropTypes.oneOf(["client", "provider", "website"]),
  label: PropTypes.string,
  classes: PropTypes.string,
  onClose: PropTypes.func,
};

TutorialVideo.propTypes = {
  ...tutorialVideoPropTypes,
  isEnabled: PropTypes.bool.isRequired,
  queryClient: PropTypes.object.isRequired,
};
TutorialVideoContent.propTypes = tutorialVideoPropTypes;
