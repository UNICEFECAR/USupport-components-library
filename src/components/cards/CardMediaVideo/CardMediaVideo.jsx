import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Icon } from "../../icons/Icon/Icon";
import { Box } from "../../boxes/Box/Box";
import { Label } from "../../labels/Label/Label";
import { Grid } from "../../grids/Grid/Grid";
import { GridItem } from "../../grids/GridItem/GridItem";
import { Like } from "../../icons/Like/Like";
import { NewButton } from "../../buttons";
import { ThemeContext } from "../../../utils";

import "./card-media-video.scss";

/**
 * CardMedia
 *
 * CardMedia component to be used to display article details
 *
 * @return {jsx}
 */
export const CardMediaVideo = ({
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
  isWhiteBackground = false,
  children,
  handlePlay,
  t,
  style,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const isPodcastContent =
    contentType === "podcasts" || contentType === "podcast";

  const readMoreLabel = (() => {
    if (typeof t !== "function") return "Read more";

    // Match CardMedia behavior: read_more_button for articles, otherwise view_more.
    const key = contentType === "articles" ? "read_more_button" : "view_more";
    const resolved = t(key);

    // Fallbacks for namespaces where `key` may not exist.
    if (!resolved || resolved === key) return t("read_more_button") || t("view_more") || "Read more";
    return resolved;
  })();

  const whiteBackgroundStyle =
    isWhiteBackground && theme === "light"
      ? { backgroundColor: "#ffffff", ...style }
      : style;

  const renderLabels = () => {
    return labels.map((label, index) => {
      return (
        <Label
          classes={"card-media-video__label"}
          text={label.name}
          key={index}
          paletteIndex={index}
        />
      );
    });
  };

  const shouldShowPlayIcon =
    handlePlay &&
    (contentType === "videos" ||
      contentType === "podcasts" ||
      contentType === "video" ||
      contentType === "podcast");

  const IS_PS = localStorage.getItem("country") === "PS";
  const IS_RTL = localStorage.getItem("language") === "ar";

  return (
    <Box
      classes={[
        `card-media-video card-media-video--${type} card-media-video--${size} ${
          isRead ? " card-media-video--read" : ""
        }`,
        isPodcastContent ? "card-media-video--podcast" : "",
        IS_RTL ? " card-media-video--rtl" : "",
        classNames(classes),
      ].join("")}
      {...props}
      style={whiteBackgroundStyle}
      onClick={onClick}
      liquidGlass
    >
      <div className="card-media-video__image-container">
        <img
          className="card-media-video__image"
          src={image ? image : "https://picsum.photos/343/400"}
          alt="card-media-video"
          onClick={
            isPodcastContent
              ? (e) => {
                  e.stopPropagation();
                  if (handlePlay) handlePlay();
                  else onClick?.(e);
                }
              : onClick
          }
        />
        {shouldShowPlayIcon && (
          <div
            className="card-media-video__play-overlay"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            <Icon name="play" color="#ffffff" size="xl" />
          </div>
        )}
      </div>
      {categoryName && (
        <div className="card-media-video__category">
          <p
            className={`text card-media-video__category__text ${
              theme === "highContrast"
                ? "card-media-video__category__text--hc"
                : ""
            }`}
          >
            {categoryName}
          </p>
        </div>
      )}
      {isRead && (
        <div className="card-media-video__read">
          <p className="text card-media-video__read__text">{t("read")}</p>
        </div>
      )}
      <div className={"card-media-video__content"}>
        {showLabels && labels?.length > 0 && (
          <div
            className={[
              "card-media-video__labels",
              type === "landscape" ? "card-media-video__labels--landscape" : "",
            ].join(" ")}
          >
            {renderLabels()}
          </div>
        )}
        <Grid>
          <GridItem xs={4} md={8} lg={12} classes="card-media-video__title">
            <h4 className="card-media-video__title__text">{title}</h4>
          </GridItem>
        </Grid>
        {/* <div className="card-media-video__content__details">
          <div className="card-media-video__content__details__left">
            <div className="card-media-video__content__details__left__read-time-creator-like">
              <div className="card-media-video__content__details__left__read-time-creator">
                {creator && (
                  <p
                    className={
                      "text card-media-video__content__details__left__creator"
                    }
                    title={t("by", { creator })}
                  >
                    {t("by", { creator })}
                  </p>
                )}
                <div className={"card-media-video__details"}>
                  {readingTime && (
                    <React.Fragment>
                      <Icon
                        name="time"
                        size="sm"
                        color={
                          theme === "highContrast"
                            ? "#ffff00" // highContrast color_text_main
                            : theme === "dark"
                              ? "#ededed" // dark color_text_main
                              : "#0e202f" // light color_text_main
                        }
                      />
                      <p className="text">
                        {readingTime} {t("min_read")}
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className={"card-media-video__description"}>
          <p className="text" id="description">
            {showDescription && description}
          </p>
        </div>

        {!IS_PS && (
          <div className="card-media-video__bottom-container">
            {isPodcastContent && (
              <div
                className="card-media-video__read-more-button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <NewButton
                  label={readMoreLabel}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(e);
                  }}
                />
              </div>
            )}
            <div
              onClick={
                isPodcastContent
                  ? (e) => {
                      e.stopPropagation();
                    }
                  : undefined
              }
            >
              <Like
                isLiked={isLikedByUser}
                isDisliked={isDislikedByUser}
                likes={likes}
                dislikes={dislikes}
              />
            </div>
          </div>
        )}
      </div>

      {children}
    </Box>
  );
};

CardMediaVideo.propTypes = {
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
   * Whether the card background should be white in light theme
   * */
  isWhiteBackground: PropTypes.bool,

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

CardMediaVideo.defaultProps = {
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
  isWhiteBackground: false,
  handlePlay: undefined,
};
