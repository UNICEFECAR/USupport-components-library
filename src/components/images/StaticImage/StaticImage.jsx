import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * StaticImage
 *
 * StaticImage component
 *
 * @return {jsx}
 */
export const StaticImage = ({
  pictureClasses,
  imageClasses,
  alt,
  webp,
  png,
  onClick,
  tabIndex = 0,
  ...props
}) => {
  return (
    <picture className={classNames(pictureClasses)} {...props}>
      <source
        className={`image ${classNames(imageClasses)}`}
        type="image/webp"
        srcSet={webp}
      />
      <source
        className={`image ${classNames(imageClasses)}`}
        type="image/png"
        srcSet={png}
      />
      <img
        className={`image ${classNames(imageClasses)}`}
        src={png}
        alt={alt}
        tabIndex={tabIndex}
        onClick={onClick}
      />
    </picture>
  );
};

StaticImage.propTypes = {
  /**
   * Picture classes
   **/
  pictureClasses: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Image classes
   * */
  imageClasses: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Alt text
   * */
  alt: PropTypes.string,

  /**
   * Webp image
   * */
  webp: PropTypes.string,

  /**
   * Png image
   * */
  png: PropTypes.string,

  /**
   * On click function
   * */
  onClick: PropTypes.func,
};
