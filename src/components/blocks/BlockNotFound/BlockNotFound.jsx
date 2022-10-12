import React from "react";
import PropTypes from "prop-types";
import { Block } from "../Block/Block";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Button } from "../../buttons/Button/Button";

import "./block-not-found.scss";
import mascot from "../../../assets/Mascot.png";

/**
 * BlockNotFound
 *
 * BlockNotFound
 *
 * @return {jsx}
 */
export const BlockNotFound = (
  {
    /* Add props here */
  }
) => {
  const handleOnClick = () => {};

  return (
    <Block classes="block-not-found">
      <Grid>
        <GridItem md={6} lg={6}>
          <GridItem md={4} lg={6} classes="block-not-found__content">
            <h3>Oops! We can't find the page you are looking for...</h3>
            <p className="text sub-heading">
              It seems this page is missing or is not available at the moment.
            </p>
            <Button label="Go to Homepage" size="lg" />
          </GridItem>
        </GridItem>
        <GridItem md={2} lg={6} classes="block-not-found__mascot-item">
          <img src={mascot} alt="Mascot" />
        </GridItem>
      </Grid>
    </Block>
  );
};

BlockNotFound.propTypes = {
  // Add propTypes here
};

BlockNotFound.defaultProps = {
  // Add defaultProps here
};
