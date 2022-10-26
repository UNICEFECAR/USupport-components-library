import React from "react";
import propTypes from "prop-types";
import { Animation } from "../../animations/Animation";

import "./loading.scss";

import LoadingAnimation from "./assets/Loading.json";

/**
 * Loading
 *
 * Loading component used as a placeholder when fetching data
 *
 * @return {jsx}
 */
export const Loading = ({
  size,
  height = "",
  padding = "10rem",
  margin = "0 auto",
}) => {
  const loadingContainerStyling = {
    height: height,
    margin: margin,
    padding: padding,
  };

  return (
    <div
      className={["loading", `loading--${size}`].join(" ")}
      style={loadingContainerStyling}
    >
      <Animation json={LoadingAnimation} />
    </div>
  );
};

Loading.propTypes = {
  /**
   * Size of the loading animation
   * */
  size: propTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Height of the loading container
   * */
  height: propTypes.string,

  /**
   * Padding of the loading container
   * */
  padding: propTypes.string,

  /**
   * Margin of the loading container
   * */
  margin: propTypes.string,
};

Loading.defaultProps = {
  size: "md",
};
