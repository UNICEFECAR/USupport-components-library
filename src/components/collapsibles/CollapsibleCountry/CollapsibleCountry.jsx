import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible/Collapsible";
import { IconFlag } from "../../icons/IconFlag/IconFlag";

import "./collapsiblecountry.scss";

/**
 * CollapsibleCounrty
 *
 * Component
 *
 * @return {jsx}
 */
export const CollapsibleCountry = ({ country, onLanguageClick }) => {
  const renderCountryHeading = () => {
    return (
      <div className="country-details">
        <div className="flag-container">
          <IconFlag flagName={country.flagName} />
        </div>
        <p className="text country-name">{country.name}</p>
      </div>
    );
  };

  const renderLanguages = () => {
    return (
      <div className="languages">
        {country.languages.map((language, index) => {
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
        heading={renderCountryHeading(country)}
        content={renderLanguages(country)}
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
