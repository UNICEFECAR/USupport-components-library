import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons";
import { Avatar } from "../../avatars";
import { Box } from "../../boxes";
import { getDateView, getDayOfTheWeek } from "../../../utils/";
import { VideoPlayer } from "../../others";
import "./provider-details.scss";

/**
 * ProviderDetails
 *
 * Provider details block
 *
 * @return {jsx}
 */
export const ProviderDetails = ({
  provider,
  image,
  t,
  buttonComponent,
  renderIn,
  hasCookies = true,
  cookieState,
  setCookieState,
  activeCoupon,
  classes,
  iconColor = "#66768D",
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");

  const displayName = provider?.patronym
    ? `${provider.name} ${provider.patronym} ${provider.surname}`
    : `${provider?.name} ${provider?.surname}`;

  const renderSpecializations = useCallback(() => {
    if (provider) {
      return provider.specializations.map((x) => t(x))?.join(", ");
    }
  }, [provider, t]);

  const renderWorkWith = useCallback(() => {
    if (provider) {
      if (typeof provider.workWith?.[0] === "object") {
        return provider.workWith
          .map((x) => t(x.topic.replaceAll("-", "_")))
          ?.join(", ");
      }
      return provider.workWith?.map((x) => t(x))?.join(", ");
    }
  }, [provider, t]);

  const renderLanguages = useCallback(() => {
    if (provider) {
      if (typeof provider.languages?.[0] === "object") {
        return provider.languages
          .map((x) => {
            return x.name === "English"
              ? x.name
              : `${x.name} (${x.local_name})`;
          })
          ?.join(", ");
      }
      return provider.languages?.map((x) => t(x))?.join(", ");
    }
  }, [provider, t]);

  const getSlotDisplay = () => {
    if (!provider?.earliestAvailableSlot) return null;
    const earliestSlot = new Date(provider.earliestAvailableSlot);
    const dayOfWeek = t(getDayOfTheWeek(earliestSlot));
    const dateText = `${dayOfWeek} ${getDateView(earliestSlot).slice(0, 5)}`;
    const startHour = earliestSlot.getHours();
    const endHour = startHour + 1;
    const timeText = `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${endHour < 10 ? `0${endHour}` : endHour}:00`;
    return { dateText, timeText };
  };

  const slotDisplay = getSlotDisplay();
  const price = provider?.consultationPrice;
  const isFree = !price || price === 0 || activeCoupon;

  const educationText =
    provider?.education?.length > 0 ? provider.education.join(", ") : null;

  return (
    <Box
      classes={["provider-details__box", classes].filter(Boolean).join(" ")}
      liquidGlass
    >
      <div className="provider-details__header">
        <div className="provider-details__header__provider-info">
          <Avatar image={image} size="lg" />
          <div className="provider-details__header__provider-details">
            <h4 className="provider-details__header__provider-name">
              {displayName}
            </h4>
            <p className="provider-details__header__specializations text">
              {renderSpecializations()}
            </p>
            <div className="provider-details__header__badges">
              {isFree ? (
                <span className="small-text provider-details__badge provider-details__badge--free">
                  {activeCoupon ? t("coupon") : t("free")}
                </span>
              ) : (
                <span className="provider-details__badge provider-details__badge--price">
                  {price}
                  {currencySymbol}
                </span>
              )}
            </div>
          </div>
        </div>

        {buttonComponent && (
          <div className="provider-details__header__actions">
            {buttonComponent}
          </div>
        )}
      </div>

      <div className="provider-details__info-grid">
        {renderIn !== "client" && renderIn !== "website" && provider?.phone && (
          <div className="provider-details__info-item">
            <Icon name="call" color={iconColor} />
            <div className="provider-details__info-item__content">
              <span className="provider-details__info-item__label text">
                {t("phone_label")}
              </span>
              <span className="provider-details__info-item__value text">
                {provider.phone}
              </span>
            </div>
          </div>
        )}

        {renderIn !== "client" && renderIn !== "website" && provider?.email && (
          <div className="provider-details__info-item">
            <Icon name="mail-admin" color={iconColor} />
            <div className="provider-details__info-item__content">
              <span className="provider-details__info-item__label text">
                {t("email_label")}
              </span>
              <span className="provider-details__info-item__value text">
                {provider.email}
              </span>
            </div>
          </div>
        )}

        {renderIn !== "client" &&
          renderIn !== "website" &&
          provider?.organizations?.length > 0 && (
            <div className="provider-details__info-item">
              <Icon name="organisation" color={iconColor} />
              <div className="provider-details__info-item__content">
                <span className="provider-details__info-item__label text">
                  {t("organizations_label")}
                </span>
                <span className="provider-details__info-item__value text">
                  {provider.organizations?.map((org) => org.name).join(", ")}
                </span>
              </div>
            </div>
          )}
      </div>

      <div className="provider-details__layout">
        {slotDisplay && (
          <div className="provider-details__section">
            <div className="provider-details__section__header">
              <Icon name="calendar" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("earliest_slot_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {slotDisplay.dateText}, {slotDisplay.timeText}
            </p>
          </div>
        )}

        {provider?.totalConsultations > 0 && (
          <div className="provider-details__section">
            <div className="provider-details__section__header">
              <Icon name="consultation" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("done_consultations_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {provider.totalConsultations} {t("consultations")}
            </p>
          </div>
        )}

        {renderLanguages() && educationText && (
          <div className="provider-details__section">
            <div className="provider-details__section__header">
              <Icon name="globe" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("languages_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {renderLanguages()}
            </p>
          </div>
        )}

        {renderLanguages() && !educationText && (
          <div className="provider-details__section">
            <div className="provider-details__section__header">
              <Icon name="globe" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("languages_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {renderLanguages()}
            </p>
          </div>
        )}

        {educationText && (
          <div className="provider-details__section">
            <div className="provider-details__section__header">
              <Icon name="read-book" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("education_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {educationText}
            </p>
          </div>
        )}

        {provider?.description && (
          <div className="provider-details__section provider-details__section--description">
            <div className="provider-details__section__header">
              <Icon name="document" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("description_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {provider.description}
            </p>
          </div>
        )}

        {renderWorkWith() && (
          <div className="provider-details__section provider-details__section--specialties">
            <div className="provider-details__section__header">
              <Icon name="community" color={iconColor} />
              <span className="provider-details__section__title text">
                {t("work_with_label")}
              </span>
            </div>
            <p className="provider-details__section__content text">
              {renderWorkWith()}
            </p>
          </div>
        )}
      </div>

      {provider?.videoLink && (
        <div className="provider-details__section provider-details__section--video">
          <div className="provider-details__section__header">
            <Icon name="video" color={iconColor} />
            <span className="provider-details__section__title text">
              {t("video_label")}
            </span>
          </div>
          <div className="provider-details__video-player-wrapper">
            <VideoPlayer
              url={provider.videoLink}
              hasCookies={hasCookies}
              classes="provider-details__video-player"
              cookieState={cookieState}
              setCookieState={setCookieState}
            />
          </div>
        </div>
      )}
    </Box>
  );
};

ProviderDetails.propTypes = {
  provider: PropTypes.object,
  image: PropTypes.string,
  t: PropTypes.func.isRequired,
  buttonComponent: PropTypes.element,
  renderIn: PropTypes.string,
  hasCookies: PropTypes.bool,
  cookieState: PropTypes.bool,
  setCookieState: PropTypes.func,
  activeCoupon: PropTypes.object,
  classes: PropTypes.string,
  iconColor: PropTypes.string,
};
