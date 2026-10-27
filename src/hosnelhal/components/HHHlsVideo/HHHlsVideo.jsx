import React, { useRef } from "react";
import PropTypes from "prop-types";
import ReactHlsPlayer from "react-hls-player";

import {
  HHMediaControls,
  mediaLabelsPropType,
} from "../HHMediaControls/HHMediaControls";
import { useMediaPlayer } from "../../hooks/useMediaPlayer";

import "./hh-hls-video.scss";

// Start at the lowest quality, step up when the connection allows. Defined once:
// react-hls-player reloads the stream whenever it receives a new config object.
const HLS_CONFIG = { startLevel: 0, capLevelToPlayerSize: true };

/**
 * HHHlsVideo
 *
 * Plays adaptive HLS streams (.m3u8) - the player starts at the lowest
 * quality and steps up when the connection allows - and falls back to a
 * plain video file. Controls sit in a bar under the video.
 *
 * @return {jsx}
 */
export const HHHlsVideo = ({ src, poster, title, labels, onPlay }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const player = useMediaPlayer(playerRef);
  const isHls = src?.includes(".m3u8");

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      // iOS Safari only allows the video element itself to go full screen
      playerRef.current?.webkitEnterFullscreen?.();
    }
  };

  const videoProps = {
    className: "hh-hls-video__video",
    playsInline: true,
    preload: "metadata",
    poster,
    title,
    onPlay,
    onClick: player.toggle,
  };

  return (
    <div className="hh-hls-video" ref={containerRef}>
      {isHls ? (
        <ReactHlsPlayer
          playerRef={playerRef}
          src={src}
          hlsConfig={HLS_CONFIG}
          {...videoProps}
        />
      ) : (
        <video ref={playerRef} src={src} {...videoProps} />
      )}
      <HHMediaControls
        player={player}
        labels={labels}
        onFullscreen={toggleFullscreen}
        className="hh-hls-video__controls"
      />
    </div>
  );
};

HHHlsVideo.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string,
  labels: mediaLabelsPropType.isRequired,
  onPlay: PropTypes.func,
};
