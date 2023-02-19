import React from "react";
import PropTypes from "prop-types";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Line } from "../../separators/Line/Line";
import { CheckBox } from "../../inputs/CheckBox/CheckBox";
import { noImagePlaceholder } from "../../../assets";

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
  image,
  selected,
  setSelected,
}) => {
  return (
    <>
      <div className="sos-center-row" onClick={() => setSelected(!selected)}>
        <CheckBox
          isChecked={selected}
          setIsChecked={setSelected}
          classes="sos-center-row__checkbox"
        />
        <Grid md={8} lg={12} classes={"sos-center-row__grid"}>
          <GridItem md={1} lg={1} classes="sos-center-row__grid__image-item">
            <img src={image ? image : noImagePlaceholder} />
          </GridItem>
          <GridItem md={4} lg={5}>
            <p className="text heading sos-center-row__heading">{heading}</p>
            <p className="small-text">{text}</p>
          </GridItem>

          <GridItem md={1} lg={3} classes="sos-center-row__link">
            {link ? (
              <a href={link} target="_blank">
                <p className="text sos-center-row__heading ">{link}</p>
              </a>
            ) : (
              <p>-</p>
            )}
          </GridItem>

          <GridItem md={2} lg={3} classes="sos-center-row__phone">
            {phone ? (
              <a href={`tel:${link}`} target="_blank">
                <p className="text sos-center-row__heading ">{phone}</p>
              </a>
            ) : (
              <p>-</p>
            )}
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
   * Image of the row
   * */
  image: PropTypes.string,

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
