import React from "react";
import PropTypes from "prop-types";

import "./hh-guidance-item.scss";

/**
 * HHGuidanceItem
 *
 * Icon with a short title and explanation
 *
 * @return {jsx}
 */
export const HHGuidanceItem = ({ as: Tag = "h3", icon, title, text }) => {
  return (
    <div className="hh-guidance-item">
      {icon && <img className="hh-guidance-item__icon" src={icon} alt="" />}
      <div className="hh-guidance-item__copy">
        <Tag className="hh-guidance-item__title">{title}</Tag>
        <p className="hh-guidance-item__text">{text}</p>
      </div>
    </div>
  );
};

HHGuidanceItem.propTypes = {
  as: PropTypes.elementType,
  icon: PropTypes.string,
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
};
