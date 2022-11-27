import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../../inputs/CheckBox/CheckBox";
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
      <div className="article-row">
        <CheckBox
          isChecked={selected}
          setIsChecked={setSelected}
          classes="article-row__checkbox"
        />
        <div className="article-row__content">
          <img src={image} classes="article-row__content__image" />
          <div className="article-row__content__text-container">
            <p className="text article-row__content__text-container__heading">
              {heading}
            </p>
            <p className="small-text">{description}</p>
          </div>
          <Button
            label={buttonLabel}
            type="primary"
            size="sm"
            color="purple"
            classes="article-row__content__button"
            onClick={() => {
              onClick && onClick();
            }}
          />
        </div>
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
