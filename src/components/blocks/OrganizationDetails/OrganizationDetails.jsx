import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid, GridItem } from "../../grids";
import { Icon } from "../../icons";
import { Box } from "../../boxes";
import { NewButton } from "../../buttons/Button";
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
  onReportClick,
  iconColor = "#66768D",
  classes,
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

  const handleReportInactive = () => {
    onReportClick?.();
  };

  return (
    <Box
      classes={[
        "organization-details",
        "organization-details__box",
        classes,
      ]
        .filter(Boolean)
        .join(" ")}
      liquidGlass
    >
      <Grid classes="organization-details__grid">
        <GridItem xs={4} md={8} lg={12}>
          <div className="organization-details__header">
            <div className="organization-details__header__title-row">
              <h4 className="organization-details__header__title">
                {organization?.name}
              </h4>
              <div
                onClick={handleCopyLink}
                className="organization-details__header__share"
              >
                <Icon name="share" size="sm" />
              </div>
            </div>
            <div className="organization-details__header__report">
              <NewButton
                label={t("report_inactive")}
                type="red"
                size="md"
                onClick={handleReportInactive}
              />
            </div>
          </div>
        </GridItem>

        <GridItem
          xs={4}
          md={4}
          lg={6}
          classes="organization-details__grid__column"
        >
          {(organization?.phone ||
            organization?.email ||
            organization?.websiteUrl) && (
            <div className="organization-details__contacts">
              {organization?.phone && (
                <div className="organization-details__information-container-with-icon">
                  <div>
                    <Icon name="call" size="md" color={iconColor} />
                  </div>
                  <p className="text">{organization.phone}</p>
                </div>
              )}
              {organization?.email && (
                <div className="organization-details__information-container-with-icon">
                  <div>
                    <Icon name="mail-admin" size="md" color={iconColor} />
                  </div>
                  <p className="text">{organization.email}</p>
                </div>
              )}
              {organization?.websiteUrl && (
                <div className="organization-details__information-container-with-icon">
                  <div>
                    <Icon name="globe" size="md" color={iconColor} />
                  </div>
                  <p className="text">
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
            </div>
          )}
        </GridItem>

        <GridItem
          xs={4}
          md={4}
          lg={6}
          classes="organization-details__grid__column"
        >
          {organization?.address && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("address_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {organization.address}
              </p>
            </div>
          )}

          {organization?.district?.name && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("sector_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {t(organization.district.name)}
              </p>
            </div>
          )}

          {renderPaymentMethods() && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("payment_methods_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {renderPaymentMethods()}
              </p>
            </div>
          )}

          {renderUserInteractions() && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("user_interactions_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {renderUserInteractions()}
              </p>
            </div>
          )}

          {renderPropertyTypes() && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("property_types_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {renderPropertyTypes()}
              </p>
            </div>
          )}

          {renderSpecialisations() && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("offered_services_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {renderSpecialisations()}
              </p>
            </div>
          )}

          {organization?.providers?.length > 0 && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("providers_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {organization.providers
                  .map((provider) => `${provider.name} ${provider.surname}`)
                  .join(", ")}
              </p>
            </div>
          )}

          {description && (
            <div className="organization-details__information-container">
              <p className="text organization-details__information-container__heading">
                {t("other_services_label")}
              </p>
              <p className="text organization-details__information-container__text">
                {description}
              </p>
            </div>
          )}
        </GridItem>

        {buttonComponent ? (
          <GridItem xs={4} md={8} lg={12}>
            {buttonComponent}
          </GridItem>
        ) : null}
      </Grid>
    </Box>
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
   * Opens organization report flow (e.g. confirmation modal)
   */
  onReportClick: PropTypes.func,

  /**
   * Icon color in HEX format
   */
  iconColor: PropTypes.string,

  /**
   * Extra classes for the outer Box (e.g. page-specific spacing hooks)
   */
  classes: PropTypes.string,
};
