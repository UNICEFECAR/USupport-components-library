import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid, GridItem } from "../../grids";
import { Icon } from "../../icons";
import { Avatar } from "../../avatars";
import "./organization-details.scss";

/**
 * OrganizationDetails
 *
 * Organization details block
 *
 * @return {jsx}
 */
export const OrganizationDetails = ({
  organization,
  t,
  buttonComponent,
  handleCopyLink,
  iconColor = "#66768D",
}) => {
  const renderSpecialisations = React.useCallback(() => {
    if (organization?.specialisations?.length > 0) {
      return organization.specialisations.map((x) => t(x.name))?.join(", ");
    }
    return null;
  }, [organization, t]);

  const renderPaymentMethods = React.useCallback(() => {
    if (organization?.paymentMethods?.length > 0) {
      return organization.paymentMethods.map((x) => t(x.name))?.join(", ");
    }
    return null;
  }, [organization, t]);

  const renderUserInteractions = React.useCallback(() => {
    if (organization?.userInteractions?.length > 0) {
      return organization.userInteractions
        .map((x) => t(x.name + "_interaction"))
        ?.join(", ");
    }
    return null;
  }, [organization, t]);

  const renderPropertyTypes = React.useCallback(() => {
    if (organization?.propertyTypes?.length > 0) {
      return organization.propertyTypes.map((x) => t(x.name))?.join(", ");
    }
    return null;
  }, [organization, t]);

  const { i18n } = useTranslation();

  const description = React.useMemo(() => {
    const language = i18n.language?.toLowerCase();

    if (language === "ro") {
      return organization?.descriptionRO || null;
    }

    if (language === "uk") {
      return organization?.descriptionUK || null;
    }

    return organization?.description || null;
  }, [organization, i18n.language]);

  return (
    <Grid classes="organization-details__grid">
      <GridItem md={4} lg={4}>
        <div className="organization-details__header">
          <div className="organization-details__header__organization-container">
            {/* <Avatar
              image={image}
              classes="organization-details__header__organization-container__avatar"
            /> */}
            <div className="organization-details__header__organization-container__text-container">
              <div className="organization-details__header__organization-container__text-container__name-container">
                <h4 className="organization-details__header__organization-container__text-container__name">
                  {organization?.name}
                </h4>
                <div
                  onClick={handleCopyLink}
                  className="organization-details__header__organization-container__text-container__share"
                >
                  <Icon name="share" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {organization?.phone && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="call"
                size="md"
                color={iconColor}
              />
            </div>
            <p className="paragraph">{organization.phone}</p>
          </div>
        )}
        {organization?.email && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="mail-admin"
                size="md"
                color={iconColor}
              />
            </div>
            <p className="paragraph">{organization.email}</p>
          </div>
        )}
        {organization?.websiteUrl && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="globe"
                size="md"
                color={iconColor}
              />
            </div>
            <p className="paragraph">
              <a
                href={organization.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {organization.websiteUrl}
              </a>
            </p>
          </div>
        )}
      </GridItem>

      <GridItem md={8} lg={8}>
        <Grid>
          <GridItem md={4} lg={6} classes="organization-details__grid__item">
            {organization?.address && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("address_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {organization.address}
                </p>
              </div>
            )}

            {organization?.district?.name && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("sector_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {t(organization.district.name)}
                </p>
              </div>
            )}

            {renderPaymentMethods() && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("payment_methods_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderPaymentMethods()}
                </p>
              </div>
            )}

            {renderUserInteractions() && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("user_interactions_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderUserInteractions()}
                </p>
              </div>
            )}

            {renderPropertyTypes() && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("property_types_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderPropertyTypes()}
                </p>
              </div>
            )}

            {renderSpecialisations() && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("offered_services_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderSpecialisations()}
                </p>
              </div>
            )}

            {organization?.providers?.length > 0 && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("providers_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {organization.providers
                    .map((provider) => `${provider.name} ${provider.surname}`)
                    .join(", ")}
                </p>
              </div>
            )}
          </GridItem>

          <GridItem md={4} lg={6} classes="organization-details__grid__item">
            {description && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("other_services_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {description}
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

OrganizationDetails.propTypes = {
  /**
   * The organization data object
   *  */
  organization: PropTypes.object,

  /**
   * The button component to be rendered at the bottom of the grid
   */
  buttonComponent: PropTypes.element,

  /**
   * Translation function
   */
  t: PropTypes.func,

  /**
   * Handle copy link function
   */
  handleCopyLink: PropTypes.func,

  /**
   * Icon color in HEX format
   */
  iconColor: PropTypes.string,
};
