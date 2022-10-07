import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../../icons/Icon/Icon";

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
  collapsibleContent,
  iconSize,
  iconColor,
  classes,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={[
        "collapsible",
        classNames(classes),
        isCollapsed ? "collapsible--expanded" : "",
      ].join(" ")}
    >
      <div className="heading" onClick={() => setIsCollapsed(!isCollapsed)}>
        {heading}
        <Icon name={"arrow-chevron-down"} size={iconSize} color={iconColor} />
      </div>
      <div className="collapsible-content">{collapsibleContent}</div>
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
  collapsibleContent: PropTypes.element,

  /**
   * Size of the icon
   * @see Icon
   **/
  iconSize: PropTypes.oneOf("sm", "md", "lg"),

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
