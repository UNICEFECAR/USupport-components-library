import React from "react";
import PropTypes from "prop-types";
import { Loading } from "../../loaders/Loading";
import { Icon } from "../../icons/Icon";
import classNames from "classnames";

import "./access-token.scss";

/**
 * AccessToken
 *
 * Display and copy Access token
 *
 * @return {jsx}
 */
export const AccessToken = ({
  handleCopy,
  accessTokenLabel,
  copyLabel,
  isLoading = false,
  accessToken,
  showInstructions = false,
  activateAnimation = false,
  classes,
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(accessToken);
    handleCopy();
  };

  return (
    <div className={[classNames(classes)].join(" ")}>
      {accessTokenLabel && (
        <p className="access-token-container__label">{accessTokenLabel}</p>
      )}
      <div className="access-token-container">
        {isLoading ? <Loading size="sm" /> : <h4>{accessToken}</h4>}
        <Icon
          name="copy"
          color="#9749FA"
          classes="access-token-container__copy-icon"
          onClick={handleCopyToClipboard}
        />
        {showInstructions && (
          <div
            className={`access-token-container__copy-text ${
              activateAnimation
                ? "access-token-container__copy-text__action"
                : ""
            }`}
          >
            <Icon name="arrow-chevron-back" size="sm" color="#3d527b" />
            <p className="small-text">{copyLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

AccessToken.propTypes = {
  /**
   * Access token label
   * */
  accessTokenLabel: PropTypes.string,

  /**
   * Access token
   * */
  accessToken: PropTypes.string,

  /**
   * Is loading
   * */
  isLoading: PropTypes.bool,

  /**
   * Classes
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

AccessToken.defaultProps = {
  // Add defaultProps here
};
