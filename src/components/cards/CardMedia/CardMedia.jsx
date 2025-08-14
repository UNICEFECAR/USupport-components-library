import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Button } from "../../buttons/Button/Button";
import { Icon } from "../../icons/Icon/Icon";
import { Box } from "../../boxes/Box/Box";
import { Label } from "../../labels/Label/Label";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Like } from "../../icons/Like/Like";
import { ThemeContext } from "../../../utils";

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
  likes,
  dislikes,
  isLikedByUser,
  isDislikedByUser,
  contentType = "articles",
  isRead,
  children,
  handlePlay,
  t,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const renderLabels = () => {
    return labels.map((label, index) => {
      return (
        <Label classes={"card-media__label"} text={label.name} key={index} />
      );
    });
  };

  const shouldShowPlayIcon =
    handlePlay &&
    (contentType === "videos" ||
      contentType === "podcasts" ||
      contentType === "video" ||
      contentType === "podcast");

  console.log(!!handlePlay);
  console.log(contentType);
  console.log(shouldShowPlayIcon);

  return (
    <Box
      classes={[
        `card-media card-media--${type} card-media--${size} ${
          isRead ? " card-media--read" : ""
        }`,
        ,
        classNames(classes),
      ].join("")}
      {...props}
      onClick={onClick}
    >
      <div className="card-media__image-container">
        <img
          className="card-media__image"
          src={image ? image : "https://picsum.photos/343/400"}
          alt="card-media"
          onClick={onClick}
        />
        {shouldShowPlayIcon && (
          <div
            className="card-media__play-overlay"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            <Icon name="play" color="#ffffff" size="xl" />
          </div>
        )}
      </div>
      <div className="card-media__category">
        <p
          className={`small-text card-media__category__text ${
            theme === "highContrast" ? "card-media__category__text--hc" : ""
          }`}
        >
          {categoryName}
        </p>
      </div>
      {isRead && (
        <div className="card-media__read">
          <p className="small-text card-media__read__text">{t("read")}</p>
        </div>
      )}
      <div className={"card-media__content"}>
        {showLabels && labels?.length > 0 && (
          <div className={"card-media__labels"}>{renderLabels()}</div>
        )}
        <div className="card-media__content__details">
          <div className="card-media__content__details__left">
            <div className="card-media__content__details__left__read-time-creator-like">
              <div className="card-media__content__details__left__read-time-creator">
                {creator && (
                  <p className={"small-text"}>{t("by", { creator })}</p>
                )}
                <div className={"card-media__details"}>
                  {readingTime && (
                    <React.Fragment>
                      <Icon
                        name={"time"}
                        size="sm"
                        color={theme === "highContrast" ? "#ffff00" : "#66768d"}
                      />
                      <p className={"small-text"}>
                        {readingTime} {t("min_read")}
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
              {/* <Like
                isLiked={isLikedByUser}
                isDisliked={isDislikedByUser}
                likes={likes}
                dislikes={dislikes}
              /> */}
            </div>
          </div>
        </div>
        <Grid>
          <GridItem xs={4} md={8} lg={12} classes="card-media__title">
            <h4 className="card-media__title__text">{title}</h4>
          </GridItem>
        </Grid>
        <div className={"card-media__description"}>
          <p className={" small-text"} id="description">
            {showDescription && description}
          </p>
        </div>

        <div className="card-media__bottom-container">
          <Button
            type={"text"}
            label={t(
              contentType === "articles" ? "read_more_button" : "view_more"
            )}
            onClick={() => {
              onClick && onClick();
            }}
            classes="card-media__read-more-button"
          />
          <Like
            isLiked={isLikedByUser}
            isDisliked={isDislikedByUser}
            likes={likes}
            dislikes={dislikes}
          />
        </div>
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
   * Content type to determine behavior and styling
   * */
  contentType: PropTypes.oneOf([
    "articles",
    "videos",
    "podcasts",
    "video",
    "podcast",
  ]),

  /**
   * Function to handle play action for videos and podcasts
   * */
  handlePlay: PropTypes.func,

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
  contentType: "articles",
  handlePlay: undefined,
};
