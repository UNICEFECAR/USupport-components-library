import React, { useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../utils";
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
  handleClick = () => {},
  likes,
  isLiked,
  dislikes,
  isDisliked,
  answerId,
  renderInClient = false,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="like">
      <div className="like__vote-wrapper">
        <div
          onClick={() =>
            handleClick(isLiked ? "remove-like" : "like", answerId)
          }
          className={[
            "like__icon-container",
            renderInClient && "like__icon-container--client",
            isLiked && "like__icon-container--selected",
          ].join(" ")}
        >
          <Icon
            name="like"
            color={theme === "highContrast" ? "#ffff00" : "#20809e"}
          />
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
            renderInClient && "like__icon-container--client",
            isDisliked && "like__icon-container--selected",
          ].join(" ")}
        >
          <Icon
            name="dislike"
            color={theme === "highContrast" ? "#ffff00" : "#20809e"}
          />
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
  handleClick: PropTypes.func,

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
  answerId: PropTypes.string,

  /*
   * Boolean to check if answer is liked
   */
  isLiked: PropTypes.bool,

  /*
   * Boolean to check if answer is disliked
   */
  isDisliked: PropTypes.bool,
};
