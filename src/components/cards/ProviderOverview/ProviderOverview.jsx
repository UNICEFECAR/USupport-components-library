import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import { Card } from "../../boxes/Card";
import { Avatar } from "../../avatars/Avatar/Avatar";
import { Icon } from "../../icons/Icon/Icon";
import { StatusBadge } from "../StatusBadge";
import { NewButton } from "../../buttons";

import { PeerSupportBadge } from "../../labels/PeerSupportBadge";
import { getDateView, getDayOfTheWeek } from "../../../utils/date";
import {
  getDisplaySpecializations,
  isPeerSupportProvider,
  resolveSpecializationKeys,
} from "../../../utils/peerSupport";

import "./provider-overview.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * ProviderOverview
 *
 * PorviderOverview component
 *
 * @return {jsx}
 */
export const ProviderOverview = ({
  image,
  name,
  patronym,
  surname,
  specializations,
  specializationKeys,
  viewProfileLabel,
  freeLabel,
  price,
  editLabel,
  statusChangeLabel,
  activitiesLabel,
  onClick,
  hasMenu,
  showActivities,
  handleEdit,
  handleUpdateStatus,
  handleViewProfile,
  handleActivities,
  handleBookSession,
  providerStatus,
  earliestAvailableSlot,
  t,
  liquidGlass,
  isPeerSupport,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const nameRef = useRef(null);
  const [isSpecializationsOverflowing, setIsSpecializationsOverflowing] =
    useState(false);
  const specializationsRef = useRef(null);
  const displayName = patronym
    ? `${name} ${patronym} ${surname}`
    : `${name} ${surname}`;
  const resolvedSpecializationKeys = resolveSpecializationKeys(
    specializationKeys,
    specializations,
  );
  const showPeerBadge =
    isPeerSupport ??
    (resolvedSpecializationKeys
      ? isPeerSupportProvider(resolvedSpecializationKeys)
      : false);
  const displaySpecializations = resolvedSpecializationKeys
    ? getDisplaySpecializations(resolvedSpecializationKeys, t)
    : specializations ?? [];
  const specializationsText = displaySpecializations?.join(", ") ?? "";

  useEffect(() => {
    const checkOverflow = () => {
      if (nameRef.current) {
        const element = nameRef.current;
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsTextOverflowing(isOverflowing);
      }
    };

    requestAnimationFrame(() => {
      checkOverflow();
    });

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [displayName]);

  useEffect(() => {
    const checkOverflow = () => {
      if (specializationsRef.current) {
        const element = specializationsRef.current;
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setIsSpecializationsOverflowing(isOverflowing);
      } else {
        setIsSpecializationsOverflowing(false);
      }
    };

    requestAnimationFrame(() => {
      checkOverflow();
    });

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [specializationsText]);

  const handleToggleStatus = () => {
    setIsMenuOpen(false);
    handleUpdateStatus();
  };

  const earliestSlot = earliestAvailableSlot
    ? new Date(earliestAvailableSlot)
    : null;
  const dayOfWeek = earliestSlot && t ? t(getDayOfTheWeek(earliestSlot)) : "";
  const dateText =
    earliestSlot && dayOfWeek
      ? `${dayOfWeek} ${getDateView(earliestSlot).slice(0, 5)}`
      : "";

  const startHour = earliestSlot?.getHours();
  const endHour = startHour != null ? startHour + 1 : null;
  const timeText =
    startHour != null && endHour != null
      ? `${startHour < 10 ? `0${startHour}` : startHour}:00 - ${
          endHour < 10 ? `0${endHour}` : endHour
        }:00`
      : "";

  return (
    <Card classes={["provider-overview"].join(" ")} liquidGlass={liquidGlass}>
      <div
        className="provider-overview__content"
        onClick={!hasMenu ? onClick : undefined}
      >
        <Avatar
          image={AMAZON_S3_BUCKET + "/" + image}
          size="sm"
          isCircle={false}
        />
        <div className="provider-overview__content__text-container">
          <div className="provider-overview__content__text-container__name-container">
            <p
              ref={nameRef}
              className="provider-overview__content__text-container__name paragraph"
              title={isTextOverflowing ? displayName : undefined}
            >
              {displayName}
            </p>
            {!price && (
              <div className="provider-overview__content__text-container__free-badge">
                <p className="small-text">{freeLabel}</p>
              </div>
            )}
          </div>
          {showPeerBadge && (
            <PeerSupportBadge
              classes="provider-overview__content__text-container__peer-badge"
              label={
                t
                  ? t("peer_support", { defaultValue: "U-FRIEND" })
                  : "U-FRIEND"
              }
            />
          )}
          {specializationsText && (
            <p
              ref={specializationsRef}
              className="text provider-overview__types"
              title={
                isSpecializationsOverflowing ? specializationsText : undefined
              }
            >
              {specializationsText}
            </p>
          )}
          {providerStatus && (
            <StatusBadge status={providerStatus} label={t(providerStatus)} />
          )}
        </div>
      </div>
      <div className="provider-overview__bottom">
        {earliestAvailableSlot && (
          <div className="provider-overview__earliest">
            <p className="text provider-overview__earliest-text">
              {t("earliest_available_slot")}
            </p>
            <div className="provider-overview__earliest-container__wrapper">
              <div className="provider-overview__earliest-container">
                <Icon name="calendar" size="sm" color={"#66768D"} />
                <div className="provider-overview__earliest-container__text">
                  <p className="text">{dateText}</p>
                </div>
              </div>
              <div className="provider-overview__earliest-container">
                <Icon name="time" size="sm" color={"#66768D"} />
                <div className="provider-overview__earliest-container__text">
                  <p className="text">{timeText}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="provider-overview__actions">
          <NewButton
            type="outline"
            size="md"
            label={viewProfileLabel}
            onClick={(e) => {
              e.stopPropagation();
              if (handleViewProfile) {
                handleViewProfile();
              } else if (!hasMenu && onClick) {
                onClick();
              }
            }}
          />
          <NewButton
            size="md"
            label={t ? t("book_session") : "Book session"}
            onClick={(e) => {
              e.stopPropagation();
              if (handleBookSession) {
                handleBookSession();
              }
            }}
          />
        </div>
      </div>
      {isMenuOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
          <div className="provider-overview__menu">
            <div
              onClick={handleViewProfile}
              className="provider-overview__menu__content"
            >
              <Icon name="person" size="md" color="#20809E" />
              <p className="text">{viewProfileLabel}</p>
            </div>
            <div
              onClick={handleEdit}
              className="provider-overview__menu__content"
            >
              <Icon name="edit" size="md" />
              <p className="text">{editLabel}</p>
            </div>

            {showActivities && (
              <div
                onClick={handleActivities}
                className="provider-overview__menu__content"
              >
                <Icon name="activities" size="md" />
                <p className="text">{activitiesLabel}</p>
              </div>
            )}
            <div
              onClick={handleToggleStatus}
              className="provider-overview__menu__content"
            >
              <Icon
                color={providerStatus === "active" ? "#eb5757" : "#20809E"}
                name={
                  providerStatus === "active"
                    ? "circle-actions-close"
                    : "circle-actions-success"
                }
                size="md"
              />
              <p className="text">{statusChangeLabel}</p>
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </Card>
  );
};

ProviderOverview.propTypes = {
  /**
   * Image url
   */
  image: PropTypes.string,

  /**
   * Name of the provider
   * */
  name: PropTypes.string,

  /**
   * Specialities of the provider
   * */
  specialities: PropTypes.string,

  /**
   * Experience of the provider
   * */
  experience: PropTypes.number,

  /**
   * On click handler
   * */
  onClick: PropTypes.func,

  /**
   * Text(translated in the used language) showing the years of experience of the provider
   * */
  yearsOfExperienceText: PropTypes.string,

  /**
   * Does the component have a hideable menu
   */
  hasMenu: PropTypes.bool,

  /**
   * Label for the view profile containaer
   * */
  viewProfileLabel: PropTypes.string,

  /**
   * Label for the edit container
   */
  editLabel: PropTypes.string,

  /**
   * Label for the delete container
   * */
  statusChangeLabel: PropTypes.string,

  /**
   * Handler for the view profile container
   */
  handleViewProfile: PropTypes.func,

  /**
   * Handler for the edit container
   * */
  handleEdit: PropTypes.func,

  /**
   * Handler for the delete conatiner
   * */
  handleDelete: PropTypes.func,
  /**
   * Handler for the book session button
   */
  handleBookSession: PropTypes.func,
  /**
   * Whether to use liquid glass background
   */
  liquidGlass: PropTypes.bool,
  /**
   * Raw specialization keys from the API
   */
  specializationKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * Whether the provider is a peer support (U-FRIEND) type
   */
  isPeerSupport: PropTypes.bool,
};

ProviderOverview.defaultProps = {
  onClick: () => {},
  yearsOfExperienceText: "years experience Overall",
  iconName: "arrow-chevron-forward",
  hasMenu: false,
  editLabel: "Edit",
  statusChangeLabel: "Activate",
  viewProfileLabel: "View profile",
  liquidGlass: false,
  isPeerSupport: false,
};
