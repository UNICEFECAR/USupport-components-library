import React from "react";
import PropTypes from "prop-types";
import { Box } from "../../boxes/Box";
import classNames from "classnames";

import { PeerSupportBadge } from "../../labels/PeerSupportBadge";
import {
  getDisplaySpecializations,
  isPeerSupportProvider,
  resolveSpecializationKeys,
} from "../../../utils/peerSupport";

import "./card-provider-small.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * CardProviderSmall
 *
 * Provider small card
 *
 * @return {jsx}
 */
export const CardProviderSmall = ({
  providerName,
  description,
  specializationKeys,
  specializations,
  classes,
  image,
  onClick,
  t,
}) => {
  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");
  const resolvedSpecializationKeys = resolveSpecializationKeys(
    specializationKeys,
    specializations,
  );
  const showPeerBadge =
    resolvedSpecializationKeys &&
    isPeerSupportProvider(resolvedSpecializationKeys);
  const displayDescription = resolvedSpecializationKeys
    ? getDisplaySpecializations(resolvedSpecializationKeys, t).join(", ")
    : description;

  return (
    <Box
      classes={classNames(["card-provider-small", classes])}
      onClick={onClick}
      role="button"
    >
      <img src={imageUrl} alt={providerName} />
      <div className="card-provider-small__information">
        <h4>{providerName}</h4>
        {showPeerBadge && (
          <PeerSupportBadge label={t ? t("peer_support") : "U-FRIEND"} />
        )}
        {displayDescription && <p className="text">{displayDescription}</p>}
      </div>
    </Box>
  );
};

CardProviderSmall.propTypes = {
  /**
   *
   * Name of the provider
   **/
  providerName: PropTypes.string,
  /**
   *
   * Description of the provider
   **/
  description: PropTypes.string,
  /**
   * Raw specialization keys from the API
   */
  specializationKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * Raw or translated specialization values
   */
  specializations: PropTypes.arrayOf(PropTypes.string),
  /**
   * Translation function
   */
  t: PropTypes.func,

  /**
   * Additional classes to be added to the card
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CardProviderSmall.defaultProps = {
  description: "Therapist and life coach",
  classes: "",
};
