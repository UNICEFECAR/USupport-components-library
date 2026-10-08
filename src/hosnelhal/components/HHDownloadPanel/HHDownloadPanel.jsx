import React from "react";
import PropTypes from "prop-types";

import { HHButton } from "../HHButton/HHButton";

import "./hh-download-panel.scss";

/**
 * HHDownloadPanel
 *
 * Download options for a resource. The first option is the main action.
 *
 * @return {jsx}
 */
export const HHDownloadPanel = ({ title, text, options, note }) => {
  return (
    <section className="hh-download-panel" aria-label={title}>
      <h2 className="hh-download-panel__title">{title}</h2>
      {text && <p className="hh-download-panel__text">{text}</p>}
      <div className="hh-download-panel__options">
        {options.map((option, index) => (
          <HHButton
            key={option.href}
            variant={index === 0 ? "primary" : "outline"}
            href={option.href}
            download
            fullWidth
            onClick={option.onClick}
          >
            {option.label}
          </HHButton>
        ))}
      </div>
      {note && <p className="hh-download-panel__note">{note}</p>}
    </section>
  );
};

HHDownloadPanel.propTypes = {
  title: PropTypes.node.isRequired,
  text: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
  note: PropTypes.node,
};
