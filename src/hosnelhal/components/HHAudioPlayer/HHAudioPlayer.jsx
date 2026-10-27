import React, { useRef } from "react";
import PropTypes from "prop-types";

import { HHButton } from "../HHButton/HHButton";
import { HHIcon } from "../HHIcon/HHIcon";
import {
  HHMediaControls,
  mediaLabelsPropType,
} from "../HHMediaControls/HHMediaControls";
import { useMediaPlayer } from "../../hooks/useMediaPlayer";

import "./hh-audio-player.scss";

/**
 * HHAudioPlayer
 *
 * Cover image, title, a large play button and the time / seek / volume bar
 *
 * @return {jsx}
 */
export const HHAudioPlayer = ({ src, cover, title, labels, onPlay }) => {
  const audioRef = useRef(null);
  const player = useMediaPlayer(audioRef);

  return (
    <div className="hh-audio-player">
      {cover && <img className="hh-audio-player__cover" src={cover} alt="" />}
      <div className="hh-audio-player__playback">
        <p className="hh-audio-player__title">{title}</p>
        <HHButton className="hh-audio-player__play" onClick={player.toggle}>
          <HHIcon name={player.isPlaying ? "pause" : "play"} size={18} />
          {player.isPlaying ? labels.pause : labels.play}
        </HHButton>
        <HHMediaControls
          player={player}
          labels={labels}
          showPlayButton={false}
          className="hh-audio-player__controls"
        />
        <audio ref={audioRef} src={src} preload="metadata" onPlay={onPlay} />
      </div>
    </div>
  );
};

HHAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  cover: PropTypes.string,
  title: PropTypes.node.isRequired,
  labels: mediaLabelsPropType.isRequired,
  onPlay: PropTypes.func,
};
