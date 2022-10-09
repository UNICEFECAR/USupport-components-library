import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../../icons/Icon";

import "./collapsible.scss";

/**
 * Collapsible
 *
 * Base Collapsible component
 *
 * @return {jsx}
 */
export const Collapsible = ({
  heading,
  content,
  iconSize,
  iconColor,
  classes,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className={[
        "collapsible",
        classNames(classes),
        isExpanded ? "collapsible--expanded" : "",
      ].join(" ")}
    >
      <div
        className="collapsible__heading"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {heading}
        <Icon name={"arrow-chevron-down"} size={iconSize} color={iconColor} />
      </div>
      <div className="collapsible__content">{content}</div>
    </div>
  );
};

Collapsible.propTypes = {
  /**
   * Heading of the collapsible
   **/
  heading: PropTypes.element,

  /**
   * Collapsible part
   * */
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),

  /**
   * Size of the icon
   * @see Icon
   **/
  iconSize: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   *  Color of the icon
   * */
  iconColor: PropTypes.string,

  /**
   * Additional classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Collapsible.defaultProps = {
  iconSize: "md",
};
