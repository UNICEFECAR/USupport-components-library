import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../../boxes/Box/Box";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { unicefLogoBig } from "../../../assets";

import "./card-partner.scss";

/**
 * CardPartner
 *
 * CardPartner component
 *
 * @return {jsx}
 */
export const CardPartner = ({
  classes,
  title,
  description,
  image,
  link,
  linkPlaceholder,
  ...props
}) => {
  return (
    <Box classes={[`card-partner `, classNames(classes)].join("")} {...props}>
      <div className="card-partner__logo">
        <img
          className="card-partner__logo__image"
          src={image ? image : unicefLogoBig}
          alt="card-partner"
        />
      </div>

      <Grid>
        <GridItem xs={4} md={8} lg={12} classes="card-partner__title">
          <h3 className="card-partner__title__text">{title}</h3>
        </GridItem>
        <GridItem xs={4} md={8} lg={12} classes="card-partner__description">
          <p className="small-text card-partner__category__text">
            {description}
          </p>
        </GridItem>
        <GridItem xs={4} md={8} lg={12}>
          <a href={`${link}`} target="_blank">
            <p className="text card-partner__link ">{linkPlaceholder}</p>
          </a>
        </GridItem>
      </Grid>
    </Box>
  );
};

CardPartner.propTypes = {
  /**
   * CardPartner title
   *  */
  title: PropTypes.string,

  /**
   * CardPartner description
   *  */
  description: PropTypes.string,

  /**
   *  CardPartner image
   * */
  image: PropTypes.string,

  /**
   * CardPartner link
   * */
  link: PropTypes.string,

  /**
   * CardPartner linkPlaceholder
   * */
  linkPlaceholder: PropTypes.string,
};

CardPartner.defaultProps = {
  title: "UNICEF",
  description: "Placehoder description",
  image: "",
};
