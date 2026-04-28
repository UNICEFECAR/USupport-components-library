import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons/Icon";

import "./action-row.scss";

/**
 * ActionRow
 *
 * Card-style action row with icon, label, optional description and chevron.
 *
 * @return {jsx}
 */
export const ActionRow = ({ iconName, label, description, onClick, isDanger }) => (
  <button
    type="button"
    className={["action-row", isDanger ? "action-row--danger" : ""].join(" ")}
    onClick={onClick}
  >
    <div className="action-row__left">
      <div className="action-row__icon">
        <Icon
          name={iconName}
          size="md"
          color={isDanger ? "#eb5757" : "#9749fa"}
        />
      </div>
      <div className="action-row__text">
        <p className="text action-row__label">{label}</p>
        {description ? (
          <p className="small-text action-row__description">{description}</p>
        ) : null}
      </div>
    </div>
    <div className="action-row__chevron">
      <Icon name="chevron-right" size="sm" />
    </div>
  </button>
);

ActionRow.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDanger: PropTypes.bool,
};

ActionRow.defaultProps = {
  description: null,
  isDanger: false,
};

