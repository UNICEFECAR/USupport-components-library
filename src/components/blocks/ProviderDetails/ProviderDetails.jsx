import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { Grid, GridItem } from "../../grids";
import { Icon } from "../../icons";
import { Avatar } from "../../avatars";
import { getTimeFromDate, getDateView } from "../../../utils/";
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
}) => {
  const currencySymbol = localStorage.getItem("currency_symbol");
  const hasAcceptedAllCookies = !!Number(
    localStorage.getItem("acceptAllCookies")
  );

  const allOptionsToString = (option) => {
    return provider[option]?.join(", ");
  };

  const renderSpecializations = useCallback(() => {
    if (provider) {
      return provider.specializations.map((x) => t(x))?.join(", ");
    }
  }, [provider]);

  const renderWorkWith = useCallback(() => {
    if (provider) {
      return provider.workWith
        .map((x) => t(x.topic.replaceAll("-", "_")))
        ?.join(", ");
    }
  }, [provider]);

  const renderLanguages = useCallback(() => {
    if (provider) {
      return provider.languages
        .map((x) => {
          return x.name === "English" ? x.name : `${x.name} (${x.local_name})`;
        })
        ?.map((x, i) => {
          return (
            <React.Fragment key={i}>
              {x}
              {i !== provider.languages?.length - 1 ? ", " : ""}
              <br />
            </React.Fragment>
          );
        });
    }
  }, [provider]);

  let earliestAvailableSlot;
  if (provider) {
    earliestAvailableSlot = `${getDateView(
      provider.earliestAvailableSlot
    )} - ${getTimeFromDate(new Date(provider.earliestAvailableSlot))}`;
  }

  return (
    <Grid classes="provider-details__grid">
      <GridItem md={4} lg={4}>
        <div className="provider-details__header">
          <div className="provider-details__header__provider-container">
            <Avatar
              image={image}
              classes="provider-details__header__provider-container__avatar"
            />
            <div className="provider-details__header__provider-container__text-container">
              <h4 className="provider-details__header__provider-container__text-container__name">
                {provider.name} {provider.patronym ? provider.patronym : ""}{" "}
                {provider.surname}
              </h4>
              <p className="paragraph">{renderSpecializations()}</p>
            </div>
          </div>
        </div>

        <div className="provider-details__information-container">
          <p className="paragraph provider-details__information-container__heading">
            {t("description_label")}
          </p>
          <p className="paragraph provider-details__information-container__text">
            {provider.description}
          </p>
        </div>

        {provider.videoLink &&
          (hasAcceptedAllCookies || renderIn === "provider") && (
            <div className="provider-details__video-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("video_label")}
              </p>
              <ReactPlayer width="96%" url={provider.videoLink} />
            </div>
          )}
      </GridItem>

      <GridItem md={4} lg={8}>
        <Grid>
          <GridItem md={4} lg={6} classes="provider-details__grid__item">
            {renderIn !== "client" && renderIn !== "website" && (
              <div className="provider-details__information-container-with-icon">
                <Icon
                  name="call"
                  size="md"
                  color="#66768D"
                  classes="provider-details__information-container-with-icon__icon"
                />
                <p className="paragraph">{provider.phone}</p>
              </div>
            )}
            {renderIn !== "client" && renderIn !== "website" && (
              <div className="provider-details__information-container-with-icon">
                <Icon
                  name="mail-admin"
                  size="md"
                  color="#66768D"
                  classes="provider-details__information-container-with-icon__icon"
                />
                <p className="paragraph">{provider.email}</p>
              </div>
            )}
            <div className="provider-details__information-container-with-icon">
              <Icon
                name="dollar"
                size="md"
                color="#66768D"
                classes="provider-details__information-container-with-icon__icon"
              />
              <p className="paragraph">
                {provider.consultationPrice > 0
                  ? `${provider.consultationPrice}${currencySymbol || "€"} ${t(
                      "hour_consultation"
                    )}`
                  : t("free")}
              </p>
            </div>

            {provider.city && (
              <>
                <div className="provider-details__information-container">
                  <p className="paragraph provider-details__information-container__heading">
                    {t("city_label")}
                  </p>
                  <p className="paragraph provider-details__information-container__text">
                    {provider.city}
                  </p>
                </div>
              </>
            )}
            {provider.street && (
              <>
                <div className="provider-details__information-container">
                  <p className="paragraph provider-details__information-container__heading">
                    {t("street_label")}
                  </p>
                  <p className="paragraph provider-details__information-container__text">
                    {provider.street}
                  </p>
                </div>
              </>
            )}
            {provider.postcode && (
              <>
                <div className="provider-details__information-container">
                  <p className="paragraph provider-details__information-container__heading">
                    {t("postcode_label")}
                  </p>
                  <p className="paragraph provider-details__information-container__text">
                    {provider.postcode}
                  </p>
                </div>
              </>
            )}

            <div className="provider-details__information-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("languages_label")}
              </p>
              <p className="paragraph provider-details__information-container__text">
                {renderLanguages()}
              </p>
            </div>

            <div className="provider-details__information-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("work_with_label")}
              </p>
              <p className="paragraph provider-details__information-container__text">
                {renderWorkWith()}
              </p>
            </div>
          </GridItem>

          <GridItem md={4} lg={6} classes="provider-details__grid__item">
            <div className="provider-details__information-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("earliest_slot_label")}
              </p>
              <p className="paragraph provider-details__information-container__text">
                {provider.earliestAvailableSlot
                  ? earliestAvailableSlot
                  : t("no_available_slot")}
              </p>
            </div>
            <div className="provider-details__information-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("education_label")}
              </p>
              <p className="paragraph provider-details__information-container__text">
                {allOptionsToString("education")}
              </p>
            </div>
            <div className="provider-details__information-container">
              <p className="paragraph provider-details__information-container__heading">
                {t("done_consultations_label")}
              </p>
              <p className="paragraph provider-details__information-container__text">
                {provider.totalConsultations} {t("consultations")}
              </p>
            </div>
            {renderIn !== "client" && renderIn !== "website" && (
              <div className="provider-details__information-container">
                <p className="paragraph provider-details__information-container__heading">
                  {t("organizations_label")}
                </p>
                <p className="paragraph provider-details__information-container__text">
                  {provider.organizations?.map((org) => org.name).join(", ")}
                </p>
              </div>
            )}
          </GridItem>
        </Grid>
      </GridItem>

      {buttonComponent}
    </Grid>
  );
};

ProviderDetails.propTypes = {
  /**
   * The provider data object
   *  */
  provider: PropTypes.object,

  /**
   * The url of the image
   */
  image: PropTypes.string,

  /**
   * The button component to be rendered at the bottom of the grid
   */
  buttonComponent: PropTypes.element,
};
