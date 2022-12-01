import React from "react";
import PropTypes from "prop-types";

import { Box } from "../Box";
import { Icon } from "../../icons/Icon";

import "./country.scss";

/**
 * Country
 *
 * Country box
 *
 * @return {jsx}
 */
export const Country = ({ countryName, countryAlpha2, handleClick }) => {
  return (
    <Box onClick={handleClick} classes="country-box">
      <Icon size="lg" name={`flag-${countryAlpha2}-round`} />
      <h4>{countryName}</h4>
    </Box>
  );
};

Country.propTypes = {
  // Add propTypes here
};

Country.defaultProps = {
  // Add defaultProps here
};
