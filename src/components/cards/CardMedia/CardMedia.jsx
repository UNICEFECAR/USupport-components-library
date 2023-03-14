import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "../../buttons/Button/Button";
import { Icon } from "../../icons/Icon/Icon";
import { Box } from "../../boxes/Box/Box";
import { Label } from "../../labels/Label/Label";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";

import "./card-media.scss";

/**
 * CardMedia
 *
 * CardMedia component to be used to display article details
 *
 * @return {jsx}
 */
export const CardMedia = ({
  type,
  size,
  classes,
  onClick,
  image,
  title,
  description,
  showDescription,
  creator,
  labels,
  showLabels,
  readingTime,
  categoryName,
  children,
  t,
  ...props
}) => {
  return (
    <Box
      classes={[
        `card-media card-media--${type} card-media--${size}`,
        classNames(classes),
      ].join("")}
      {...props}
    >
      <img
        className="card-media__image"
        src={image ? image : "https://picsum.photos/343/400"}
        alt="card-media"
      />

      <div className={"card-media__content"}>
        <Grid>
          <GridItem xs={3} md={5} lg={8} classes="card-media__title">
            <h4 className="card-media__title__text">{title}</h4>
          </GridItem>
          <GridItem xs={1} md={3} lg={4} classes="card-media__category">
            <p className="small-text card-media__category__text">
              {categoryName}
            </p>
          </GridItem>
        </Grid>
        <div className={"card-media__details"}>
          <p className={"small-text"}>{t("by", { creator })}</p>

          <Icon name={"time"} size="sm" />
          <p className={"small-text"}>
            {readingTime} {t("min_read")}
          </p>
        </div>
        {showLabels && (
          <div className={"card-media__labels"}>
            {labels.length > 0 &&
              labels &&
              labels.map((label, index) => {
                return (
                  <Label
                    classes={"card-media__label"}
                    text={label.name}
                    key={index}
                  />
                );
              })}
          </div>
        )}
        <div className={"card-media__description"}>
          <p className={" small-text"} id="description">
            {showDescription && description}
          </p>
        </div>

        <Button
          type={
            type === "landscape" && (size === "sm" || size == "md")
              ? "link"
              : "secondary"
          }
          label={t("read_more_button")}
          onClick={() => {
            onClick && onClick();
          }}
        />
      </div>

      {children}
    </Box>
  );
};

CardMedia.propTypes = {
  /**
   * CardMedia type, the default is primary default is portrait
   **/
  type: PropTypes.oneOf(["portrait", "landscape"]),

  /**
   * Size of the card, the default is sm
   * */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * OnClick function to be called when the "Read more" button is clicked
   * */
  onClick: PropTypes.func,

  /**
   * Image url which will be used to be display an image on the CardMedia
   **/
  image: PropTypes.string,

  /**
   * Title to be displayed
   * */
  title: PropTypes.string,

  /**
   * Description to be displayed
   * */
  description: PropTypes.string,

  /**
   *  Boolean to control if the description to be shown
   * */
  showDescription: PropTypes.bool,

  /**
   * Creator details to be displayed
   * */
  creator: PropTypes.string,

  /**
   * labels to be displayed
   * */
  labels: PropTypes.array,

  /**
   *  Boolean to control if labels are shown or not
   * */
  showLabels: PropTypes.bool,

  /**
   * Reading time to be displayed
   * */
  readingTime: PropTypes.string,

  /**
   * Category name to be displayed
   * */
  categoryName: PropTypes.string,

  /**
   * Additional classes to be added to the CardMedia component
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardMedia.defaultProps = {
  type: "portrait",
  size: "sm",
  classes: "",
  onClick: undefined,
  image: null,
  title: null,
  description: null,
  creator: null,
  labels: [],
  showLabels: true,
  categoryName: null,
  readingTime: null,
  showDescription: true,
};
