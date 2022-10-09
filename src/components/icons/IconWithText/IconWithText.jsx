import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/Icon";

import "./icon-with-text.scss";

/**
 * IconWithText
 *
 * The IconWithText component
 *
 * @return {jsx}
 */
export const IconWithText = ({
  iconName,
  iconSize,
  iconColor,
  text,
  onClick,
}) => {
  return (
    <div
      className="icon-with-text"
      onClick={() => (onClick ? onClick() : () => {})}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
      {text}
    </div>
  );
};

IconWithText.propTypes = {
  /**
   * Name of the icon to render from the sprite file (e.g. "filter")
   * */
  iconName: PropTypes.string.isRequired,

  /**
   * iconSize of the icon
   * */
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Color of the icon in HEX format (does not work for all types of icons)
   * */
  iconColor: PropTypes.string,

  /**
   * Text to be dislpayed next tot eh icon
   * */
  text: PropTypes.element.isRequired,

  /**
   * OnClick function to be called when the IconWithText is clicked
   * */
  onClick: PropTypes.func,
};

IconWithText.defaultProps = {
  iconSize: "md",
  IconColor: null,
};
