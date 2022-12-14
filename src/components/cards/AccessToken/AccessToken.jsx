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
  accessTokenLabel,
  isLoading = false,
  accessToken,
  classes,
}) => {
  // TODO: Show confirmation for copying ?
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(accessToken);
  };

  return (
    <div className={[classNames(classes)].join(" ")}>
      <p className="access-token-container__label">{accessTokenLabel}</p>
      <div className="access-token-container">
        {isLoading ? <Loading size="sm" /> : <h4>{accessToken}</h4>}
        <Icon
          name="copy"
          color="#9749FA"
          classes="access-token-container__copy-icon"
          onClick={handleCopyToClipboard}
        />
      </div>
    </div>
  );
};

AccessToken.propTypes = {
  // Add propTypes here
};

AccessToken.defaultProps = {
  // Add defaultProps here
};
