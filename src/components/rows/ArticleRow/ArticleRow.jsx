import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../../inputs/CheckBox/CheckBox";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { articlePlaceholder } from "../../../assets";
import { Line } from "../../separators/Line/Line";
import { Button } from "../../buttons/Button/Button";

import "./article-row.scss";

/**
 * ArticleRow
 *
 * ArticleRow component
 *
 * @return {jsx}
 */
export const ArticleRow = ({
  selected,
  setSelected,
  image,
  heading,
  description,
  buttonLabel,
  onClick,
}) => {
  return (
    <>
      <div className="article-row" onClick={setSelected}>
        <CheckBox
          isChecked={selected}
          setIsChecked={setSelected}
          classes="article-row__checkbox"
        />
        <Grid classes="article-row__grid">
          <GridItem md={1} lg={1} classes="article-row__grid__image-item">
            <img src={image ? image : articlePlaceholder} />
          </GridItem>

          <GridItem md={6} lg={9} classes="article-row__grid__content-item">
            <p className="article-row__grid__content-item__heading">
              {heading}
            </p>
            <p className="small-text">{description}</p>
          </GridItem>
          <GridItem md={1} lg={2} classes="article-row__grid__button-item">
            <Button
              label={buttonLabel}
              type="primary"
              size="sm"
              color="purple"
              classes="article-row__grid__button-item__button"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
            />
          </GridItem>
        </Grid>
      </div>
      <Line />
    </>
  );
};

ArticleRow.propTypes = {
  /**
   * Is the article selected
   */
  selected: PropTypes.bool,

  /**
   * Set the article as selected
   */
  setSelected: PropTypes.func,

  /**
   * Image of the article
   */
  image: PropTypes.string,

  /**
   * Heading of the article
   */
  heading: PropTypes.string,

  /**
   * Description of the article
   * */
  description: PropTypes.string,

  /**
   * Label of the button
   * */
  buttonLabel: PropTypes.string,

  /**
   * Function to be called when the button is clicked
   * */
  onClick: PropTypes.func,
};

ArticleRow.defaultProps = {
  image: articlePlaceholder,
};
