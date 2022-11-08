import React from "react";
import PropTypes from "prop-types";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Line } from "../../separators/Line/Line";
import { ButtonOnlyIcon } from "../../buttons/ButtonOnlyIcon/ButtonOnlyIcon";

import "./soscenter-row.scss";

/**
 * SOSCenterRow
 *
 * SOSCenterRow Component
 *
 * @return {jsx}
 */
export const SOSCenterRow = ({ heading, text, link, phone }) => {
  const handleClick = () => {
    console.log("Click");
  };

  return (
    <>
      <div className="sos-center-row">
        <div className="sos-center-row__content">
          <Grid md={8} lg={12} classes={"sos-center-row__content__grid"}>
            <GridItem md={8} lg={8}>
              <p className="text heading sos-center-row__heading">{heading}</p>
              <p className="small-text">{text}</p>
            </GridItem>
            <GridItem md={8} lg={3}>
              <a href={link}>
                <p className="text sos-center-row__heading">{link}</p>
              </a>
            </GridItem>
            <GridItem md={8} lg={1}>
              <p className="text sos-center-row__heading">{phone}</p>
            </GridItem>
          </Grid>
        </div>
        <ButtonOnlyIcon
          iconName="menu"
          iconColor={"#20809E"}
          onClick={handleClick}
        />
      </div>
      <Line classes="sos-center-row-line-separator" />
    </>
  );
};

SOSCenterRow.propTypes = {
  /**
   * Heading of the row
   */
  heading: PropTypes.string.isRequired,

  /**
   * Text of the row
   * */
  text: PropTypes.string.isRequired,

  /**
   * Link of the row
   * */
  link: PropTypes.string,

  /**
   * Phone of the row
   * */
  phone: PropTypes.string,
};

SOSCenterRow.defaultProps = {};
