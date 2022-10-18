import React from "react";
import PropTypes from "prop-types";
import { Block } from "../Block/Block";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Button } from "../../buttons/Button/Button";
import { RadialCircle } from "../../radials/RadialCircle/RadialCircle";

import "./not-found.scss";

import mascot from "../../../assets/Mascot.png";

/**
 * NotFound
 *
 * NotFound block
 *
 * @return {jsx}
 */
export const NotFound = ({ headingText, subheadingText, handleClick }) => {
  return (
    <Block classes="not-found">
      <Grid>
        <GridItem md={6} lg={6} classes="not-found__content-item">
          <h3>{headingText}</h3>
          <p className="text not-found__content-item__text">{subheadingText}</p>
          <Button
            label="Go to Homepage"
            size="lg"
            onClick={handleClick ? handleClick : () => {}}
          />
        </GridItem>
        <GridItem md={2} lg={6} classes="not-found__mascot-item">
          <img src={mascot} alt="Mascot" />
        </GridItem>
      </Grid>
      <RadialCircle />
    </Block>
  );
};

NotFound.propTypes = {
  /**
   * Function to handle click event
   * */
  handleClick: PropTypes.func,
};

NotFound.defaultProps = {
  handleClick: () => {},
};