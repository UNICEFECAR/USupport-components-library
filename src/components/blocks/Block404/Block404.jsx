import React from "react";
import PropTypes from "prop-types";
import { Block } from "../Block/Block";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Button } from "../../buttons/Button/Button";

import "./block404.scss";
import mascot from "../../../assets/Mascot.png";

/**
 * Block404
 *
 * Block404
 *
 * @return {jsx}
 */
export const Block404 = (
  {
    /* Add props here */
  }
) => {
  return (
    <Block classes="block-404">
      <Grid>
        <GridItem md={5} lg={4} classes="block-404__content">
          <h3>Oops! We can't find the page you are looking for...</h3>
          <p className="text sub-heading">
            It seems this page is missing or is not available at the moment.
          </p>
          <Button label="Go to Homepage" size="lg" />
        </GridItem>
        <GridItem md={3} lg={6} classes="block-404__mascot-item">
          <img src={mascot} alt="Mascot" className="mascot" />
        </GridItem>
      </Grid>
    </Block>
  );
};

Block404.propTypes = {
  // Add propTypes here
};

Block404.defaultProps = {
  // Add defaultProps here
};
