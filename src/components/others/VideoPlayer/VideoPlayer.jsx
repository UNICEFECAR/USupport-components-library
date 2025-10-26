import React from "react";
import propTypes from "prop-types";

import ReactHlsPlayer from "react-hls-player";

import { Button } from "../../buttons/Button";
import { Box } from "../../boxes/Box";

import "./video-player.scss";

/**
 * VideoPlayer
 *
 * A reusable component for rendering video embeds with cookie consent checking
 *
 * @return {jsx}
 */
export const VideoPlayer = ({
  url,
  title,
  videoId,
  cookieState,
  setCookieState,
  t,
  className = "",
  playlistId,
  autoplay = false,
}) => {
  // Check if user has accepted cookies required for video playback
  const DISPLAY_VIDEO =
    cookieState?.hasAcceptedAllCookies || cookieState?.hasAcceptedCookies;

  // Extract video ID from URL if not provided
  const getVideoId = () => {
    if (videoId) return videoId;

    if (!url) return null;

    // YouTube URL patterns
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

    // Vimeo URL patterns
    if (url.includes("vimeo.com")) {
      const regex = /vimeo\.com\/(?:.*\/)?(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

    return null;
  };

  const extractedVideoId = getVideoId();

  const handleOpenCookieBanner = () => {
    if (setCookieState && cookieState) {
      setCookieState({
        ...cookieState,
        isBannerOpen: true,
      });
    }
  };

  const renderVideoEmbed = () => {
    const isAwsUrl = url && url.includes("aws");

    if (!extractedVideoId && !playlistId && !isAwsUrl) {
      return (
        <div className="video-player__error">
          <p>{t ? t("invalid_video_url") : "Invalid video URL"}</p>
        </div>
      );
    }

    if (!DISPLAY_VIDEO) {
      return (
        <Box boxShadow={2} classes="video-player__cookie-banner">
          <h5>
            {t
              ? t("require_cookies")
              : "This video requires cookies to be displayed. Please accept cookies to view the content."}
          </h5>
          <Button
            onClick={handleOpenCookieBanner}
            color="purple"
            size="sm"
            label={t ? t("cookie_preferences") : "Cookie Preferences"}
          />
        </Box>
      );
    }

    const isVimeo = url && url.includes("vimeo.com");
    let embedUrl = isVimeo
      ? `https://player.vimeo.com/video/${extractedVideoId}`
      : `https://www.youtube.com/embed/${extractedVideoId}`;

    if (playlistId) {
      embedUrl = `https://www.youtube.com/embed/videoid?list=${playlistId}`;
    }

    if (autoplay) {
      const separator = embedUrl.includes("?") ? "&" : "?";
      if (isVimeo) {
        embedUrl += `${separator}autoplay=1`;
      } else {
        embedUrl += `${separator}autoplay=1&mute=1`;
      }
    }

    if (isAwsUrl) {
      return (
        <div className="video-player__box">
          <ReactHlsPlayer
            src={url}
            autoPlay={true}
            controls={true}
            width="100%"
            height="auto"
            hlsConfig={{
              startLevel: -1,
              capLevelOnFPSDrop: true,
            }}
          />
        </div>
      );
    }

    return (
      <Box boxShadow={3} classes="video-player__box">
        <div className="video-player__box__embed-container">
          <iframe
            src={embedUrl}
            title={title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Box>
    );
  };

  return (
    <div className={`video-player ${className}`.trim()}>
      {renderVideoEmbed()}
    </div>
  );
};

VideoPlayer.propTypes = {
  /**
   * Video URL (YouTube or Vimeo)
   */
  url: propTypes.string,
  /**
   * Video title for accessibility
   */
  title: propTypes.string,
  /**
   * Video ID (optional, will be extracted from URL if not provided)
   */
  videoId: propTypes.string,
  /**
   * Cookie state object
   */
  cookieState: propTypes.shape({
    hasAcceptedAllCookies: propTypes.bool,
    hasAcceptedCookies: propTypes.bool,
    isBannerOpen: propTypes.bool,
  }),
  /**
   * Function to update cookie state
   */
  setCookieState: propTypes.func,
  /**
   * Translation function
   */
  t: propTypes.func,
  /**
   * Additional CSS class name
   */
  className: propTypes.string,
  /**
   * Whether the video is a playlist
   */
  playlistId: propTypes.string,
  /**
   * Whether to automatically start the video on render
   */
  autoplay: propTypes.bool,
};

VideoPlayer.defaultProps = {
  url: "",
  title: "",
  videoId: "",
  cookieState: null,
  setCookieState: null,
  t: null,
  className: "",
  autoplay: false,
};
