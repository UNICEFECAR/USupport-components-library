import React from "react";
import PropTypes from "prop-types";

import "./tabs-underlined.scss";

/**
 * TabsUnderlined
 *
 * TabsUnderlined component
 *
 * @return {jsx}
 */
export const TabsUnderlined = ({
  options,
  handleSelect,
  t,
  textType = "h4",
}) => {
  const renderText = (option) => {
    if (textType === "h1") {
      return <h1>{t ? t(`${option.value}_tab_label`) : option.label}</h1>;
    } else if (textType === "h2") {
      return <h2>{t ? t(`${option.value}_tab_label`) : option.label}</h2>;
    } else if (textType === "h3") {
      return <h3>{t ? t(`${option.value}_tab_label`) : option.label}</h3>;
    }
    return (
      <h4 className="label">
        {t ? t(`${option.value}_tab_label`) : option.label}
      </h4>
    );
  };

  const renderAllOptions = () => {
    if (options) {
      return options
        ? options.map((option, index) => {
            return (
              <div
                className={[
                  "tab",
                  option.isSelected ? "tab--selected" : "",
                  option.isInactive ? "tab--inactive" : "",
                ].join(" ")}
                onClick={() => (option.isInactive ? {} : handleSelect(index))}
                key={index}
              >
                {renderText(option)}
              </div>
            );
          })
        : null;
    }
  };

  return <div className="tabs-underlined-container">{renderAllOptions()}</div>;
};

TabsUnderlined.propTypes = {
  /**
   * options to be displayed
   */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   *handleSelect function to be called when an option is selected
   **/
  handleSelect: PropTypes.func,
};
