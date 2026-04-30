import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons/Icon/Icon";
import { Box } from "../../boxes/Box/Box";

import "./card-media-skeleton.scss";

/**
 * CardMediaSkeleton
 *
 * Skeleton placeholder for CardMedia article cards.
 *
 * @returns {jsx}
 */
export const CardMediaSkeleton = ({ type, size, classes }) => {
  return (
    <Box
      classes={[
        `card-media-skeleton card-media-skeleton--${type} card-media-skeleton--${size}`,
        classes,
      ].join(" ")}
      liquidGlass
    >
      <div className="card-media-skeleton__image-container shimmer">
        <div className="card-media-skeleton__category shimmer" />
        {/* <div className="card-media-skeleton__read shimmer" /> */}
      </div>

      <div className="card-media-skeleton__content">
        <div className="card-media-skeleton__labels">
          <div className="card-media-skeleton__label shimmer" />
          <div className="card-media-skeleton__label shimmer" />
          <div className="card-media-skeleton__label shimmer" />
        </div>

        <div className="card-media-skeleton__title">
          <div className="card-media-skeleton__line card-media-skeleton__line--title shimmer" />
        </div>

        <div className="card-media-skeleton__details">
          <div className="card-media-skeleton__line card-media-skeleton__line--creator shimmer" />
          <div className="card-media-skeleton__time">
            <Icon name="time" size="sm" />
            <div className="card-media-skeleton__line card-media-skeleton__line--time shimmer" />
          </div>
        </div>

        <div className="card-media-skeleton__description">
          <div className="card-media-skeleton__line card-media-skeleton__line--description shimmer" />
          <div className="card-media-skeleton__line card-media-skeleton__line--description shimmer" />
        </div>

        <div className="card-media-skeleton__bottom">
          <div className="card-media-skeleton__button shimmer" />
          <div className="card-media-skeleton__feedback shimmer" />
        </div>
      </div>
    </Box>
  );
};

CardMediaSkeleton.propTypes = {
  type: PropTypes.oneOf(["portrait", "landscape"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  classes: PropTypes.string,
};

CardMediaSkeleton.defaultProps = {
  type: "portrait",
  size: "lg",
  classes: "",
};
