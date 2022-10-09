import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import { GridItem } from "../../grids/GridItem";
import { Grid } from "../../grids/Grid";
import classNames from "classnames";

import "./card-specialist-small.scss";

import { specialistPlaceholder } from "../../../assets";

/**
 * CardSpecialistSmall
 *
 * Specialist small card
 *
 * @return {jsx}
 */
export const CardSpecialistSmall = ({ name, description, classes }) => {
  return (
    <Box classes={classNames(["card-specialist-small", classes])}>
      <img src={specialistPlaceholder} />
      <div className="card-specialist-small__information">
        <h4>{name}</h4>
        <p className="text">{description}</p>
      </div>
    </Box>
  );
};

CardSpecialistSmall.propTypes = {
  /**
   *
   * Name of the specialist
   **/
  name: PropTypes.string,
  /**
   *
   * Description of the specialist
   **/
  description: PropTypes.string,

  /**
   * Additional classes to be added to the card
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardSpecialistSmall.defaultProps = {
  name: "Joane Doe",
  description: "Therapist and life coach",
  classes: "",
};
