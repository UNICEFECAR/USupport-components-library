import React from "react";
import PropTypes from "prop-types";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Line } from "../../separators/Line/Line";
import { ButtonOnlyIcon } from "../../buttons/ButtonOnlyIcon/ButtonOnlyIcon";
import { CheckBox } from "../../inputs/CheckBox/CheckBox";

import "./soscenter-row.scss";

/**
 * SOSCenterRow
 *
 * SOSCenterRow Component
 *
 * @return {jsx}
 */
export const SOSCenterRow = ({
  heading,
  text,
  link,
  phone,
  selected,
  setSelected,
}) => {
  return (
    <>
      <div className="sos-center-row">
        <Grid md={8} lg={12} classes={"sos-center-row__content__grid"}>
          <GridItem xs={1} md={1} lg={1}>
            <CheckBox isChecked={selected} setIsChecked={setSelected} />
          </GridItem>
          <GridItem xs={3} md={7} lg={11}>
            <Grid>
              <GridItem md={8} lg={6}>
                <p className="text heading sos-center-row__heading">
                  {heading}
                </p>
                <p className="small-text">{text}</p>
              </GridItem>
              {link && (
                <GridItem md={8} lg={3}>
                  <a href={link}>
                    <p className="text sos-center-row__heading">{link}</p>
                  </a>
                </GridItem>
              )}
              {phone && (
                <GridItem md={8} lg={3}>
                  <p className="text sos-center-row__heading">{phone}</p>
                </GridItem>
              )}
            </Grid>
          </GridItem>
        </Grid>
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

  /**
   * selected
   * @type {boolean}
   * @default false
   */
  selected: PropTypes.bool,

  /**
   * Function to set selected
   * @type {function}
   * @default () => {}
   */
  setSelected: PropTypes.func,
};

SOSCenterRow.defaultProps = {
  selected: false,
  setSelected: () => {},
};
