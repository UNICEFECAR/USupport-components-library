import React from "react";
import propTypes from "prop-types";
import { Animation } from "../../animations/Animation/Animation";

import "./loading.scss";

import LoadingAnimation from "./assets/Loading.json";

/**
 * Loading
 *
 * Loading component used as a placeholder when fetching data
 *
 * @return {jsx}
 */
export const Loading = ({ size }) => {
  return (
    <div className={["loading", `loading--${size}`].join(" ")}>
      <Animation json={LoadingAnimation} />
    </div>
  );
};

Loading.propTypes = {
  /**
   * Size of the loading animation
   * */
  size: propTypes.oneOf(["sm", "md", "lg"]),
};

Loading.defaultProps = {
  size: "md",
};
