import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HHIcon } from "../HHIcon/HHIcon";
import { HHListbox } from "../HHListbox/HHListbox";
import { useListbox } from "../../hooks/useListbox";

import "./hh-language-select.scss";

/**
 * HHLanguageSelect
 *
 * Compact language dropdown for the site header: shows the current language
 * code, lists every language in its own name
 *
 * @return {jsx}
 */
export const HHLanguageSelect = ({ id = "hh-language", languages, value, label, onChange }) => {
  const options = languages.map((language) => ({
    value: language.value,
    label: language.name,
    lang: language.value,
  }));
  const { isOpen, rootRef, selectedIndex, triggerProps, listboxProps } = useListbox({
    id,
    options,
    value,
    onChange,
  });
  const current = languages[selectedIndex];

  return (
    <div
      ref={rootRef}
      className={classNames("hh-language-select", {
        "hh-language-select--open": isOpen,
      })}
    >
      <button {...triggerProps} className="hh-language-select__trigger" aria-label={label}>
        <span lang={current?.value}>{current?.label}</span>
        <HHIcon name="chevronDown" size={16} className="hh-language-select__chevron" />
      </button>
      <HHListbox {...listboxProps} label={label} align="end" />
    </div>
  );
};

HHLanguageSelect.propTypes = {
  id: PropTypes.string,
  /** [{ value: "en", label: "EN", name: "English" }] */
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  /** Accessible name, e.g. "Language" */
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
