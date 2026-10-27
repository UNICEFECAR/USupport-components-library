import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHIcon } from "../HHIcon/HHIcon";
import { HHListbox } from "../HHListbox/HHListbox";
import { useListbox } from "../../hooks/useListbox";

import "./hh-select-field.scss";

/**
 * HHSelectField
 *
 * Labelled dropdown styled as a filter box
 *
 * @return {jsx}
 */
export const HHSelectField = ({ id, label, value, options, onChange }) => {
  const { isOpen, rootRef, selectedIndex, triggerProps, listboxProps } = useListbox({
    id,
    options,
    value,
    onChange,
  });
  const labelId = `${id}-label`;

  return (
    <div
      ref={rootRef}
      className={classNames("hh-select-field", { "hh-select-field--open": isOpen })}
    >
      <button
        {...triggerProps}
        className="hh-select-field__trigger"
        aria-labelledby={labelId}
      >
        <span className="hh-select-field__label" id={labelId}>
          {label}
        </span>
        <span className="hh-select-field__value">
          {options[selectedIndex]?.label}
        </span>
        <HHIcon name="chevronDown" size={18} className="hh-select-field__chevron" />
      </button>

      <HHListbox {...listboxProps} labelledBy={labelId} />
    </div>
  );
};

HHSelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
