import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../";

import "./like.scss";

/**
 * Like
 *
 * Like component used in MyQA
 *
 * @return {jsx}
 */
export const Like = ({
  handleClick,
  likes,
  isLiked,
  dislikes,
  isDisliked,
  answerId,
}) => {
  return (
    <div className="like">
      <div className="like__vote-wrapper">
        <div
          onClick={() =>
            handleClick(isLiked ? "remove-like" : "like", answerId)
          }
          className={[
            "like__icon-container",
            isLiked && "like__icon-container__selected",
          ].join(" ")}
        >
          <Icon name="like" />
          <div className="like__icon-container__text-container">
            <p className="small-text">{likes}</p>
          </div>
        </div>
      </div>
      <div className="like__vote-wrapper">
        <div
          onClick={() =>
            handleClick(isDisliked ? "remove-dislike" : "dislike", answerId)
          }
          className={[
            "like__icon-container",
            isDisliked && "like__icon-container__selected",
          ].join(" ")}
        >
          <Icon name="dislike" />
          <div className="like__icon-container__text-container">
            <p className="small-text">{dislikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Like.propTypes = {
  /*
   * Function to handle like and dislike
   */
  handleClick: PropTypes.func.isRequired,

  /*
   * Number of likes
   */
  likes: PropTypes.number.isRequired,

  /*
   * Number of dislikes
   */
  dislikes: PropTypes.number.isRequired,

  /*
   * Answer id
   */
  answerId: PropTypes.number.isRequired,

  /*
   * Boolean to check if answer is liked
   */
  isLiked: PropTypes.bool.isRequired,

  /*
   * Boolean to check if answer is disliked
   */
  isDisliked: PropTypes.bool.isRequired,
};
