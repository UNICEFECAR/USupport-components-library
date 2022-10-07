import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible/Collapsible";
import { IconFlag } from "../../icons/IconFlag/IconFlag";

import "./collapsiblecountry.scss";

/**
 * ComponentNew
 *
 * Component
 *
 * @return {jsx}
 */
export const CollapsibleCountry = ({ country, handleOnClickLanguage }) => {
  const renderCountryHeading = () => {
    return (
      <div className="country-details">
        <div className="flag-container">
          <IconFlag flagName={country.flagName} />
        </div>
        <p className="text">{country.name}</p>
      </div>
    );
  };

  const renderLanguages = () => {
    return (
      <div className="languages">
        {country.languages.map((language) => {
          return (
            <p className="text" onClick={handleOnClickLanguage}>
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
        collapsibleContent={renderLanguages(country)}
        iconColor={"#20809E"}
        iconSize="md"
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
  handleOnClickLanguage: PropTypes.func,
};

CollapsibleCountry.defaultProps = {
  handleOnClickLanguage: () => {},
};
