import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Button } from "../../buttons/Button/Button";
import { Box } from "../../boxes/Box/Box";

import {
  checkIsFiveMinutesBefore,
  getDateView,
  getMonthName,
  getOrdinal,
} from "../../../utils";

import "./consultation-dashboard.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * ConsultationDashboard
 *
 * ConsultationDashboard component
 *
 * @return {jsx}
 */
export const ConsultationDashboard = ({
  classes,
  consultation,
  handleJoin,
  handleEdit,
  handleAcceptSuggestion,
  handleSchedule,
  t,
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  const {
    providerName,
    timestamp,
    image,
    status,
    price,
    campaignId,
    sponsorImage,
  } = consultation || {};
  // const name = consultation.providerName || consultation.clientName;
  const imageUrl = AMAZON_S3_BUCKET + "/" + (image || "default");

  const isLive = checkIsFiveMinutesBefore(timestamp);

  const startDate = new Date(timestamp);
  const ordinal = getOrdinal(startDate?.getDate());
  const dateText = `${getDateView(startDate).slice(0, 2)}${t(ordinal)} ${t(
    getMonthName(startDate).toLowerCase()
  )}`;

  const time = startDate.getHours();
  const timeText = startDate ? `${time < 10 ? `0${time}` : time}:00` : "";

  return (
    <Box
      shadow={1}
      classes={["consultation-dashboard", classNames(classes)].join(" ")}
    >
      {consultation ? (
        <div className="consultation-dashboard__content">
          <div className="consultation-dashboard__content__date">
            {isLive ? (
              <p className="small-text now-text">{t("live_label")}</p>
            ) : (
              <p className="small-text">{`${dateText} ${timeText}`}</p>
            )}
            <div
              className={`consultation-dashboard__content__date__price__badge ${
                consultation.price > 0 && campaignId
                  ? "consultation-dashboard__content__date__price__badge--paid"
                  : "consultation-dashboard__content__date__price__badge--free"
              }`}
            >
              {campaignId && sponsorImage ? (
                <img
                  className="consultation-dashboard__content__date__price__badge__sponsor-image"
                  src={AMAZON_S3_BUCKET + "/" + sponsorImage}
                  alt="sponsor"
                />
              ) : null}
              <p className="small-text">
                {consultation.price > 0 && campaignId
                  ? `${consultation.price}${currencySymbol || ""}`
                  : t("free")}
              </p>
            </div>
          </div>
          <div className="consultation-dashboard__content__provider-container">
            <img src={imageUrl} className="provider-image" />
            <p className="text">{providerName}</p>
          </div>
          {status === "suggested" ? (
            <Button
              type="primary"
              label={t("accept_button_label")}
              size="sm"
              onClick={() =>
                handleAcceptSuggestion(consultation.consultationId, price)
              }
            />
          ) : isLive ? (
            <Button
              label={t("join_button_label")}
              color="purple"
              size="sm"
              classes="consultation-dashboard__button"
              onClick={() => handleJoin(consultation)}
            />
          ) : (
            <Button
              label={t("change_button_label")}
              type="secondary"
              size="sm"
              color="purple"
              onClick={() => handleEdit(consultation)}
            />
          )}
        </div>
      ) : (
        <div className="consultation-dashboard__no-consultation">
          <p className="small-text no-booking-text">{t("no_consultations")}</p>
          <Button
            size="sm"
            label={t("schedule_button_label")}
            color="purple"
            onClick={handleSchedule}
          />
        </div>
      )}
    </Box>
  );
};

ConsultationDashboard.propTypes = {
  /**
   * Additional classes to be added to the ConsultationDashboard
   * */
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * The translation function
   */
  t: PropTypes.func,
};

ConsultationDashboard.defaultProps = {
  providerName: "",
  consultationDate: "",
  isLive: false,
};
