import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import OutsideClickHandler from "react-outside-click-handler";
import { Icon, IconFlag } from "../../icons";
import { List } from "../../lists";
import { Button } from "../../buttons";
import { Box } from "../../boxes";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import getCountryFromTimezone from "../../../utils/getCountryFromTimezone";
import languageSvc from "../../../services/language";
import countrySvc from "../../../services/country";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./navbar.scss";

import { logoHorizontalPng } from "../../../assets";

const englishLanguage = {
  label: "English",
  value: "en",
};

const kazakhstanCountry = {
  value: "KZ",
  label: "Kazakhstan",
  iconName: "KZ",
};

/**
 * Navbar
 *
 * The base navbar used throughout all of the USupport Web Interfaces
 *
 * @return {jsx}
 */
export const Navbar = ({
  // TODO: Receive the default country from the parent(Page)
  pages,
  languageLabel,
  countryLabel,
  buttonText,
  showCta,
  showProfile,
  showCountries = false,
  yourProfileText,
  i18n,
  image,
  isTmpUser,
  isTmpUserAction,
  navigate,
  NavLink,
}) => {
  let { width } = useWindowDimensions();

  const imageURL = AMAZON_S3_BUCKET + "/" + image;

  const localStorageCountry = localStorage.getItem("country");
  const localStorageLanguage = localStorage.getItem("language");

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [languagesShown, setLanguagesShown] = useState(false);
  const [countriesShown, setCountriesShown] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(englishLanguage);
  const [selectedCountry, setSelectedCountry] = useState(kazakhstanCountry);

  const fetchCountries = async () => {
    const res = await countrySvc.getActiveCountries();
    const usersCountry = getCountryFromTimezone();
    const validCountry = res.data.find((x) => x.alpha2 === usersCountry);
    let hasSetDefaultCountry = false;
    const countries = res.data.map((x) => {
      const countryObject = {
        value: x.alpha2,
        label: x.name,
        countryID: x["country_id"],
        iconName: x.alpha2,
      };

      if (localStorageCountry === x.alpha2) {
        setSelectedCountry(countryObject);
      } else if (!localStorageCountry) {
        if (validCountry?.alpha2 === x.alpha2) {
          hasSetDefaultCountry = true;
          localStorage.setItem("country", x.alpha2);
          setSelectedCountry(countryObject);
        }
      }

      return countryObject;
    });

    if (!hasSetDefaultCountry && !localStorageCountry) {
      localStorage.setItem("country", kazakhstanCountry.value);
      localStorage.setItem(
        "country_id",
        countries.find((x) => x.value === kazakhstanCountry.value).countryID
      );
    }

    return countries;
  };

  const fetchLanguages = async () => {
    const res = await languageSvc.getActiveLanguages();
    const languages = res.data.map((x) => {
      const languageObject = {
        value: x.alpha2,
        label: x.name,
        id: x["language_id"],
      };
      if (localStorageLanguage === x.alpha2) {
        setSelectedLanguage(languageObject);
        i18n.changeLanguage(localStorageLanguage);
      } else if (!localStorageLanguage) {
        localStorage.setItem("language", "en");
        i18n.changeLanguage("en");
      }
      return languageObject;
    });
    return languages;
  };

  const countriesQuery = useQuery(["countries"], fetchCountries);
  const languagesQuery = useQuery(["languages"], fetchLanguages);

  const scrollTop = () => window.scrollTo(0, 0);
  const toggleNavbar = () => {
    if (width < 950) {
      setIsNavbarExpanded((prev) => !prev);
      setLanguagesShown(false);
    }
  };
  const getLink = (page) => {
    if (isTmpUser && page.url === "/consultations") {
      return "";
    } else {
      return page.url ? page.url : "#";
    }
  };

  const handleNavbarLinkClick = (page) => {
    if (isTmpUser && page.url === "/consultations") {
      isTmpUserAction();
    }
  };

  let items = [];
  pages.forEach((page) => {
    items.push({
      value: (
        <NavLink
          to={getLink(page)}
          className={({ isActive }) =>
            "nav__item" + (isActive ? " nav__item--current" : "")
          }
          onClick={() => handleNavbarLinkClick(page)}
          end={page.exact ? page.exact : false}
        >
          <p className="paragraph">{page.name}</p>
        </NavLink>
      ),
      onClick: scrollTop,
    });
  });

  items.push({
    value: (
      <div
        className={[
          "nav__globe",
          "nav__item",
          languagesShown ? "nav__globe--expanded" : "",
          width < 950 ? "nav__languages--mobile" : "",
        ].join(" ")}
        onClick={() => {
          toggleLanguages();
        }}
      >
        <p className="nav__current-language">{selectedLanguage.value}</p>

        <Icon name="arrow-chevron-down" size="sm" color="#20809e" />
      </div>
    ),
  });

  if (showCountries) {
    items.push({
      value: (
        <div
          className={[
            "nav__country",
            "nav__item",
            countriesShown ? "nav__country--expanded" : "",
          ].join(" ")}
          onClick={() => {
            toggleCountries();
          }}
        >
          {selectedCountry.iconName && (
            <IconFlag flagName={selectedCountry.iconName} />
          )}
          {width < 950 && <p className="paragraph">{"Country"}</p>}
          <Icon name="arrow-chevron-down" size="sm" color="#20809e" />
        </div>
      ),
    });
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setCountriesShown(false);
    localStorage.setItem("country_id", country.countryID);
    localStorage.setItem("country", country.value);
    window.dispatchEvent(new Event("countryChanged"));
  };

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    setLanguagesShown(false);
    i18n.changeLanguage(language.value);
    localStorage.setItem("language", language.value);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleLanguages = () => {
    if (!languagesShown) {
      setLanguagesShown(true);
    }
  };

  const toggleCountries = () => {
    if (!countriesShown) {
      setCountriesShown(true);
    }
    setLanguagesShown(false);
  };

  const renderCtaLoginMobile = () => {
    if (width < 950 && showCta) return ctaLogin;
  };

  const renderCtaDesktop = () => {
    if (width >= 950 && showCta) return ctaLogin;
  };

  const renderNotificationIconMobile = () => {
    if (width < 950 && showProfile) return notificationIcon;
  };

  const renderProfileContainerMobile = () => {
    if (width < 950 && showProfile) {
      return (
        <div
          className={[
            "nav__profile--mobile",
            isNavbarExpanded ? "nav__profile--mobile--shown" : "",
          ].join(" ")}
        >
          {profileContainer}
        </div>
      );
    }
  };

  const renderProfileContainerDesktop = () => {
    if (width >= 950 && showProfile) {
      return profileContainer;
    }
  };

  const ctaLogin = (
    <Button
      type="primary"
      size={width < 950 || width >= 1200 ? "sm" : "xs"}
      color="green"
      classes="nav__login"
      onClick={() => {
        navigate("/login");
        scrollTop();
      }}
      web={width >= 950}
    >
      {buttonText}
    </Button>
  );

  const handleNotificationIconClick = () => {
    if (isTmpUser) {
      setIsNavbarExpanded(false);
      isTmpUserAction();
    } else {
      navigate("/notifications");
    }
  };
  // TODO: Change the icon if there are unseen notifications
  const notificationIcon = (
    <div>
      <Icon
        classes="nav__profile__notification-icon"
        name="notification-unread"
        size="md"
        onClick={handleNotificationIconClick}
      />
    </div>
  );

  const profileContainer = (
    <div className="nav__profile">
      {width >= 950 && notificationIcon}
      <img src={imageURL} alt="profile-image" className="nav__profile__image" />
      <p onClick={handleProfileClick} className="paragraph">
        {yourProfileText}
      </p>
    </div>
  );

  const renderDropdownContent = (type) => {
    const data =
      type === "languages"
        ? languagesQuery.data || []
        : countriesQuery.data || [];

    const handleOptionSelect = (e, option) => {
      e.stopPropagation();
      if (type === "languages") {
        handleLanguageClick(option);
      } else {
        handleCountryClick(option);
      }
    };

    return (
      <div className="nav__dropdown-content">
        {data.map((option) => {
          return (
            <div
              onClick={(e) => handleOptionSelect(e, option)}
              key={option.value}
              className={
                type === "languages"
                  ? "nav__dropdown-content__lang"
                  : "nav__dropdown-content__country"
              }
            >
              {type === "countries" && <IconFlag flagName={option.iconName} />}
              <p
                className={`paragraph nav__dropdown-content__lang-label ${
                  option.value.toLowerCase() ===
                  selectedLanguage.value.toLowerCase()
                    ? "nav__dropdown-content__lang-label--selected"
                    : ""
                }`}
              >
                {option.label}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <nav
        className={[
          "nav",
          "collapsible",
          `${isNavbarExpanded ? "collapsible--expanded" : ""}`,
        ].join(" ")}
      >
        <img
          className="nav__logo"
          src={logoHorizontalPng}
          alt="logo"
          onClick={() => {
            navigate("/");
            scrollTop();
          }}
        />
        <div className="nav__clickable-area" onClick={toggleNavbar}>
          <Icon
            classes="nav__toggler"
            name={isNavbarExpanded ? "close-x" : "navbar-burger"}
            size="md"
          />
        </div>

        {renderCtaLoginMobile()}
        {renderNotificationIconMobile()}

        <List
          items={items}
          inline={width >= 950 ? true : false}
          classes={["nav__list", width < 950 ? "collapsible__content" : ""]}
          aria-expanded={isNavbarExpanded}
        />
        {renderCtaDesktop()}
        {renderProfileContainerDesktop()}
        {renderProfileContainerMobile()}
      </nav>

      <OutsideClickHandler
        onOutsideClick={() => {
          if (languagesShown) {
            setLanguagesShown(false);
          } else if (countriesShown) {
            setCountriesShown(false);
          }
        }}
      >
        <div
          className={`
          ${languagesShown ? "nav__languages" : "nav__countries "}
          ${languagesShown ? "nav__languages--shown" : ""}
          ${countriesShown ? "nav__countries--shown" : ""}
          `}
        >
          <Box
            classes={`nav__languages__content
             ${languagesShown ? "nav__languages__content--shown" : ""}
             ${countriesShown ? "nav__countries__content--shown" : ""}
              `}
          >
            {width >= 950 && (
              <h4>{languagesShown ? languageLabel : countryLabel}</h4>
            )}
            {languagesShown ? renderDropdownContent("languages") : null}
            {countriesShown ? renderDropdownContent("countries") : null}
          </Box>
        </div>
      </OutsideClickHandler>
    </>
  );
};

Navbar.propTypes = {
  /**
   * The pages to be displayed in the navbar
   * */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      exact: PropTypes.bool,
    })
  ).isRequired,

  /**
   * The countries to be displayed in the navbar
   *  */
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * The countries to be displayed in the navbar
   *  */
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),

  /**
   * The text to be displayed in the language dropdown
   */
  languageLabel: PropTypes.string,

  /**
   * The text to be displayed in the country dropdown
   */
  countryLabel: PropTypes.string,

  /**
   * The text to be displayed in the CTA button
   */
  buttonText: PropTypes.string,

  /**
   * Whether to show the CTA button
   */
  showCta: PropTypes.bool,

  /**
   * Whether to show the profile container
   */
  showProfile: PropTypes.bool,

  /**
   * Whether to show the countries dropdown
   */
  showCountries: PropTypes.bool,

  /**
   * The i18n instance
   */
  i18n: PropTypes.any,

  /**
   * Users image
   */
  image: PropTypes.string,

  /**
   * Is the user temporary
   */
  isTmpUser: PropTypes.bool,

  /**
   * The function to be called on a certain action if the user is temporary
   */
  onTmpUserAction: PropTypes.func,

  /**
   * The navigate function returned from the useNavigate hook
   */
  navigate: PropTypes.func.isRequired,
};
