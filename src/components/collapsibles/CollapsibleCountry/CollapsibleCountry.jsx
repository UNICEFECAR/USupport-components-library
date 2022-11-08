import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible";
import { IconFlag } from "../../icons/IconFlag";

import "./collapsiblecountry.scss";

/**
 * CollapsibleCounrty
 *
 * Component
 *
 * @return {jsx}
 */
export const CollapsibleCountry = ({ languages, onLanguageClick }) => {
  const renderLanguages = () => {
    return (
      <div className="languages">
        {languages.map((language, index) => {
          return (
            <p
              className="text"
              onClick={
                onLanguageClick ? () => onLanguageClick(language) : () => {}
              }
              key={index}
            >
              {language}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="country">
      <Collapsible
        heading={"Language"}
        content={renderLanguages()}
        iconColor={"#20809e"}
        iconSize="sm"
      />
    </div>
  );
};

CollapsibleCountry.propTypes = {
  /**
   * Country object
   **/
  country: PropTypes.object,

  /**
   * Function to handle click on language
   **/
  onLanguageClick: PropTypes.func,
};

CollapsibleCountry.defaultProps = {
  onLanguageClick: () => {},
};
