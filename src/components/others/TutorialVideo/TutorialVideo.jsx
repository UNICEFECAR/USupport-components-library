import React, { useState } from "react";
import PropTypes from "prop-types";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Modal } from "../../modals/Modal";
import { VideoPlayer } from "../VideoPlayer";
import { useGetTutorial } from "./useGetTutorial";

import "./tutorial-video.scss";

/**
 * CMS-backed tutorial help. The host supplies its QueryClient explicitly.
 * Labels live in blocks.tutorial-video, with a generic label for new keys.
 * Remount the content when its identity changes so an open video cannot
 * carry over to another tutorial, platform, or language.
 */
export const TutorialVideo = ({ tutorialKey, language, queryClient, platform = "client", ...props }) => {
  // Follow the apps' country-based feature gates. Keep this outside the
  // content component so other countries do not mount the CMS query at all.
  if (localStorage.getItem("country") !== "AM") return null;

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

const TutorialVideoContent = ({ tutorialKey, language, platform, label, classes = "", onClose }) => {
  const { t } = useTranslation("blocks", { keyPrefix: "tutorial-video" });
  const buttonLabel = label || t(tutorialKey, {
    lng: language,
    defaultValue: t("label", { lng: language }),
  });
  const closeLabel = t("close", { lng: language });
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };
  const { data: tutorial, isError, isLoading } = useGetTutorial(
    tutorialKey,
    language,
    platform
  );
  const video = tutorial?.video;
  const isPlayable = video?.hls_url && (!video.status || video.status === "ready");

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
        className={["tutorial-video__trigger", classes].filter(Boolean).join(" ")}
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
          classes="tutorial-video__modal"
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
  platform: PropTypes.oneOf(["client", "provider", "website"]),
  label: PropTypes.string,
  classes: PropTypes.string,
  onClose: PropTypes.func,
};

TutorialVideo.propTypes = {
  ...tutorialVideoPropTypes,
  queryClient: PropTypes.object.isRequired,
};
TutorialVideoContent.propTypes = tutorialVideoPropTypes;
