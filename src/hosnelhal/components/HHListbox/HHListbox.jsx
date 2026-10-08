import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHIcon } from "../HHIcon/HHIcon";

import "./hh-listbox.scss";

/**
 * HHListbox
 *
 * Popup list of options driven by useListbox - spread its `listboxProps`
 *
 * @return {jsx}
 */
export const HHListbox = ({
  id,
  options,
  selectedIndex,
  activeIndex,
  getOptionId,
  hidden,
  onActivate,
  onSelect,
  labelledBy,
  label,
  align = "stretch",
  className,
}) => {
  return (
    <ul
      id={id}
      className={classNames("hh-listbox", `hh-listbox--${align}`, className)}
      role="listbox"
      aria-labelledby={labelledBy}
      aria-label={label}
      tabIndex={-1}
      hidden={hidden}
    >
      {options.map((option, index) => (
        <li
          key={option.value}
          id={getOptionId(index)}
          role="option"
          lang={option.lang}
          aria-selected={index === selectedIndex}
          className={classNames("hh-listbox__option", {
            "hh-listbox__option--active": index === activeIndex,
            "hh-listbox__option--selected": index === selectedIndex,
          })}
          onPointerEnter={() => onActivate(index)}
          // Keep focus on the trigger while choosing with the mouse
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => onSelect(index)}
        >
          <span>{option.label}</span>
          {index === selectedIndex && (
            <HHIcon name="check" size={16} className="hh-listbox__check" />
          )}
        </li>
      ))}
    </ul>
  );
};

HHListbox.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      lang: PropTypes.string,
    })
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  getOptionId: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  onActivate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  labelledBy: PropTypes.string,
  label: PropTypes.string,
  /** "stretch" matches the trigger width, "end" hangs from the trigger's end edge */
  align: PropTypes.oneOf(["stretch", "end"]),
  className: PropTypes.string,
};
