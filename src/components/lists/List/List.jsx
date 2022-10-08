import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./list.scss";

/**
 * List
 *
 * The base List component
 *
 * @return {jsx}
 */
export const List = ({ items, inline = false, classes, ...props }) => {
  return (
    <ul
      className={[
        "list",
        `${inline ? "list--inline" : ""}`,
        `${classNames(classes)}`,
      ].join(" ")}
      {...props}
    >
      {items &&
        items.map((item, index) => (
          <li
            key={index}
            className="list__item"
            onClick={item.onClick ? () => item.onClick() : () => {}}
          >
            {item.value}
          </li>
        ))}
    </ul>
  );
};

List.propTypes = {
  /**
   * An array of item objects -> {onClick?: function, value: string}
   **/
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    })
  ).isRequired,

  /**
   * Whether the list should be inline or not
   */
  inline: PropTypes.bool,

  /**
   * Additional classes to be added to the button
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

List.defaultProps = {
  inline: false,
  classes: "",
};
