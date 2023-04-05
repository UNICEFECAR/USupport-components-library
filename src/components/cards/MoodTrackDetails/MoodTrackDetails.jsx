import React from "react";
import PropTypes from "prop-types";

import "./mood-track-details.scss";
import { Box } from "../../boxes";
import { Emoticon, Icon } from "../../icons";

/**
 * MoodTrackDetails
 *
 * MoodTrackDetails card used in MoodTrackHistoryNew block
 *
 * @return {jsx}
 */
export const MoodTrackDetails = ({ mood, handleClose, t }) => {
  const dateText = `${
    mood.time.getDate() > 9 ? mood.time.getDate() : `0${mood.time.getDate()}`
  }.${
    mood.time.getMonth() + 1 > 9
      ? mood.time.getMonth() + 1
      : `0${mood.time.getMonth() + 1}`
  }.${mood.time.getFullYear()}`;
  const timeText = `${mood.time.getHours()}:${
    mood.time.getMinutes() > 9
      ? mood.time.getMinutes()
      : `0${mood.time.getMinutes()}`
  }`;

  return (
    <Box classes="mood-track-details">
      <Icon
        name="close-x"
        size="sm"
        classes="mood-track-details__close-icon"
        onClick={() => handleClose()}
      />
      <h4>
        {dateText}, {timeText}
      </h4>
      <div className="mood-track-details__subheading-container">
        <p className="text">{t("you_felt")}</p>
        <Emoticon
          name={`emoticon-${mood.mood}`}
          size="xs"
          classes="mood-track-details__subheading-container__emoticon"
        />
        <p className="text">
          {t(mood.mood)} {t("comment_text")}
        </p>
      </div>
      <p className="text mood-track-details__comment">{mood.comment}</p>
    </Box>
  );
};

MoodTrackDetails.propTypes = {
  /*
   * Mood object
   */
  mood: PropTypes.object.isRequired,

  /*
   * Function to close the details
   */
  handleClose: PropTypes.func.isRequired,
};
