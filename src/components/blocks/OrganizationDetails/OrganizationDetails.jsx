import React from "react";
import PropTypes from "prop-types";
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
export const OrganizationDetails = ({ organization, t, buttonComponent }) => {
  const renderWorkWith = React.useCallback(() => {
    if (organization) {
      return organization.workWith.map((x) => t(x.topic))?.join(", ");
    }
  }, [organization]);

  const renderSpecialisations = React.useCallback(() => {
    if (organization) {
      return organization.specialisations.map((x) => t(x.name))?.join(", ");
    }
  }, [organization]);

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
              <h4 className="organization-details__header__organization-container__text-container__name">
                {organization.name}
              </h4>
              {organization.unitName && (
                <p className="paragraph">{organization.unitName}</p>
              )}
            </div>
          </div>
        </div>

        {organization.phone && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="call"
                size="md"
                color="#66768D"
                classes="organization-details__information-container-with-icon__icon"
              />
            </div>
            <p className="paragraph">{organization.phone}</p>
          </div>
        )}
        {organization.email && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="mail-admin"
                size="md"
                color="#66768D"
                classes="organization-details__information-container-with-icon__icon"
              />
            </div>
            <p className="paragraph">{organization.email}</p>
          </div>
        )}
        {organization.websiteUrl && (
          <div className="organization-details__information-container-with-icon">
            <div>
              <Icon
                name="globe"
                size="md"
                color="#66768D"
                classes="organization-details__information-container-with-icon__icon"
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
            {organization.address && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("address_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {organization.address}
                </p>
              </div>
            )}

            {organization.district?.name && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("district_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {t(organization.district.name)}
                </p>
              </div>
            )}

            {organization.paymentMethod?.name && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("payment_method_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {t(organization.paymentMethod.name)}
                </p>
              </div>
            )}
            {organization.workWith?.length > 0 && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("work_with_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderWorkWith()}
                </p>
              </div>
            )}

            {organization.specialisations?.length > 0 && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("specialisations_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {renderSpecialisations()}
                </p>
              </div>
            )}

            {organization.providers?.length > 0 && (
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
            {organization.description && (
              <div className="organization-details__information-container">
                <p className="paragraph organization-details__information-container__heading">
                  {t("description_label")}
                </p>
                <p className="paragraph organization-details__information-container__text">
                  {organization.description}
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
   * The url of the image
   */
  // image: PropTypes.string,

  /**
   * The button component to be rendered at the bottom of the grid
   */
  buttonComponent: PropTypes.element,

  /**
   * Translation function
   */
  t: PropTypes.func,
};
