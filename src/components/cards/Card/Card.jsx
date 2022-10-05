import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "../../buttons/Button/Button";
import { Icon } from "../../icons/Icon/Icon";
import useWindowDimensions from "../../../utils/useWindowDimensions";

import "./card.scss";

/**
 * Card
 *
 * Card component to be used to display article details
 *
 * @return {jsx}
 */
export const Card = ({
  type,
  size,
  classes,
  onClick,
  image,
  title,
  description,
  creator,
  tags,
  readingTime,
  children,
  ...props
}) => {
  const { width } = useWindowDimensions();
  return (
    <div
      className={[`card card--${type} card--${size}`, classNames(classes)].join(
        ""
      )}
      {...props}
    >
      <div className={"image"}>
        <img src={image ? image : "https://picsum.photos/300/400"} />
      </div>
      <div className={"card--content"}>
        {tags.length > 0 && tags && (
          <div className={"tags"}>
            {tags.map((tag, index) => {
              return (
                <Button
                  type={"secondary"}
                  label={tag.name}
                  key={index}
                  size={"xs"}
                />
              );
            })}
          </div>
        )}
        {width > 768 && type === "landscape" && size === "lg" ? (
          <h3>{title}</h3>
        ) : (
          <h4>{title}</h4>
        )}
        <div className={"details"}>
          <p className={"small-text"}>By {creator}</p>

          <Icon name={"time"} size="sm" />
          <p className={"small-text"}> {readingTime} min read</p>
        </div>

        {description && (
          <p className={"small-text"} id="description">
            {description}
          </p>
        )}

        <Button
          id={"btn--read-more"}
          type={
            (type === "landscape" && size === "sm") ||
            (width < 768 && type === "landscape")
              ? "text"
              : "primary"
          }
          label={"Read more"}
          onClick={() => {
            onClick && onClick();
          }}
        />
      </div>
      <div></div>
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * Card type, the default is primary default is portrait
   **/
  type: PropTypes.oneOf(["portrait", "landscape"]),

  /**
   * Size of the card, the default is sm
   * */
  size: PropTypes.oneOf(["sm", "lg"]),

  /**
   * OnClick function to be called when the "Read more" button is clicked
   * */
  onClick: PropTypes.func,

  /**
   * Image url which will be used to be display an image on the card
   **/
  image: PropTypes.string,

  /**
   * Title to be displayed on the card
   * */
  title: PropTypes.string,

  /**
   * Description to be displayed on the card
   * */
  description: PropTypes.string,

  /**
   * Creator details to be displayed on the card
   * */
  creator: PropTypes.string,

  /**
   * Tags to be displayed on the card
   * */
  tags: PropTypes.array,

  /**
   * Reading time to be displayed on the card
   * */
  readingTime: PropTypes.number,

  /**
   * Additional classes to be added to the card
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Card.defaultProps = {
  type: "portrait",
  size: "sm",
  classes: "",
  onClick: undefined,
  image: null,
  title: null,
  description: null,
  creator: null,
  tags: [],
  readingTime: null,
};
