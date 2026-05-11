import React, { useState, useEffect, useContext, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { Icon, IconFlag } from "../../icons";
import { List } from "../../lists";
import { NewButton } from "../../buttons";
import { Toggle } from "../../inputs";
import { Box } from "../../boxes";
import { AccessibilityController } from "../../cards";
import { userSvc } from "../../../services";
import {
  useWindowDimensions,
  ThemeContext,
  replaceLanguageInUrl,
} from "../../../utils";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

import "./navbar.scss";

const englishLanguage = {
  label: "English",
  value: "en",
};

const kazakhstanCountry = {
  value: "KZ",
  label: "Kazakhstan",
  iconName: "KZ",
};

const polandCountry = {
  value: "PL",
  label: "Poland",
  iconName: "PL",
};

const globalCountry = {
  value: "global",
  label: "Global",
  iconName: "global",
};

/**
 * Navbar
 *
 * The base navbar used throughout all of the USupport Web Interfaces
 *
 * @return {jsx}
 */
export const Navbar = ({
  pages,
  mobilePages,
  menuPages,
  languageLabel,
  countryLabel,
  buttonText,
  showCta,
  showProfile,
  showCountries = false,
  showProfilePicture = true,
  showNotifications = true,
  yourProfileText,
  i18n,
  image,
  isTmpUser,
  isTmpUserAction,
  navigate,
  NavLink,
  languages,
  setLanguages,
  countries,
  initialLanguage,
  initialCountry,
  hasUnreadNotifications,
  renderIn = "website",
  hasThemeButton = false,
  setInitialCountry,
  setIsPodcastsActive,
  setIsVideosActive,
  t,
  clientName,
  handleLogout,
  openRegistrationModal,
  renderNotificationsContent,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  let { width } = useWindowDimensions();
  const imageURL = AMAZON_S3_BUCKET + "/" + image;
  const pathname = window.location.pathname;
  const currentUrl = window.location.href;
  const subdomain = window.location.hostname.split(".")[0];

  // Refs for hover delay management
  const hoverTimeoutRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [languagesShown, setLanguagesShown] = useState(false);
  const [countriesShown, setCountriesShown] = useState(false);
  const [profileDropdownShown, setProfileDropdownShown] = useState(false);
  const [notificationsDropdownShown, setNotificationsDropdownShown] =
    useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownAnimating, setIsDropdownAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(
    initialLanguage || englishLanguage,
  );
  const [hasSelectedInitialCountry, setHasSelectedInitialCountry] =
    useState(false);
  const defaultCountry =
    subdomain === "usupport" || subdomain === "staging"
      ? globalCountry
      : localStorage.getItem("country") === "global"
        ? globalCountry
        : localStorage.getItem("country") === "KZ"
          ? kazakhstanCountry
          : polandCountry;

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const IS_PS = localStorage.getItem("country") === "PS";
  const IS_RTL = localStorage.getItem("language") === "ar";
  const currentLanguageCode = (
    selectedLanguage?.value ||
    localStorage.getItem("language") ||
    "en"
  ).toUpperCase();

  useEffect(() => {
    if (initialCountry && !hasSelectedInitialCountry) {
      setSelectedCountry(initialCountry);
      setHasSelectedInitialCountry(true);
    }
  }, [initialCountry, hasSelectedInitialCountry]);

  useEffect(() => {
    if (initialLanguage) {
      setSelectedLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  useEffect(() => {
    if (selectedLanguage && countries?.length && languages?.length) {
      if (
        !languages.find(
          (x) =>
            x.value.toLocaleLowerCase() ===
            selectedLanguage.value?.toLocaleLowerCase(),
        )
      ) {
        const newLanguage = languages[0];
        const label = newLanguage.value.toLocaleLowerCase();
        handleLanguageClick(languages[0]);
        replaceLanguageInUrl(label);
      }
    }
  }, [countries, languages, selectedLanguage]);

  // Handle scroll detection for shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const scrollTop = () => window.scrollTo(0, 0);
  const toggleNavbar = () => {
    if (width < 1050) {
      setIsNavbarExpanded((prev) => !prev);
      setLanguagesShown(false);
      setActiveDropdown(null);
      closePageDropdown();
    }
  };

  const isInConsultation =
    ((renderIn === "client" || renderIn === "provider") &&
      currentUrl.endsWith("/consultation")) ||
    currentUrl.endsWith("/jitsi");

  const handleNavbarLinkClick = (page) => {
    if (isTmpUser && page.url === "/consultations") {
      isTmpUserAction();
    }
  };

  const closePageDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownAnimating(true);
    setIsDropdownVisible(false);

    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsDropdownAnimating(false);
    }, 200); // Match the CSS transition duration
  };

  const openPageDropdown = (pageIndex, event) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      left: rect.left,
      top: rect.bottom,
    });

    setActiveDropdown(pageIndex);
    setLanguagesShown(false);
    setCountriesShown(false);

    // Small delay to ensure proper animation
    setTimeout(() => {
      setIsDropdownVisible(true);
      setIsDropdownAnimating(false);
    }, 10);
  };

  const handleDropdownHover = (pageIndex, event) => {
    if (width >= 1050) {
      // Clear any pending close timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // If different dropdown or no dropdown open, open immediately
      if (activeDropdown !== pageIndex) {
        openPageDropdown(pageIndex, event);
      }
    }
  };

  const handleDropdownLeave = () => {
    if (width >= 1050) {
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      // Set a delay before closing to allow mouse movement to dropdown
      hoverTimeoutRef.current = setTimeout(() => {
        closePageDropdown();
      }, 150); // Small delay to allow mouse movement
    }
  };

  const handleDropdownContentEnter = () => {
    if (width >= 1050) {
      // Clear the close timeout when entering dropdown content
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    }
  };

  const handleDropdownContentLeave = () => {
    if (width >= 1050) {
      // Close dropdown when leaving dropdown content
      closePageDropdown();
    }
  };

  const handleDropdownClick = (pageIndex) => {
    if (width < 1050) {
      // Only on mobile
      setActiveDropdown(activeDropdown === pageIndex ? null : pageIndex);
      setLanguagesShown(false);
      setCountriesShown(false);
    }
  };

  const handleDropdownItemClick = (url) => {
    const fullUrl = `${
      renderIn === "website" ? "" : `/${renderIn}`
    }/${localStorage.getItem("language")}${url}`;

    navigate(fullUrl);
    setActiveDropdown(null);
    closePageDropdown();
    scrollTop();
  };

  const themeButton = (showToggle = false) => {
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    return (
      <div
        className={`nav__theme-button ${
          IS_RTL ? "nav__theme-button--rtl" : ""
        } ${showToggle ? "nav__theme-button--with-toggle" : ""}`}
        role="button"
        aria-label={t("high_contrast")}
        tabIndex="0"
        onClick={() => {
          if (width >= 1050 || showToggle) {
            toggleTheme();
          }
        }}
      >
        <Icon
          name={theme === "light" ? "dark-mode-switch" : "light-mode"}
          size="lg"
          classes={`nav__theme-button__icon ${
            IS_RTL ? "nav__theme-button__icon--rtl" : ""
          }`}
          color={
            theme === "light"
              ? "#20809E"
              : theme === "dark"
                ? "#FDDA0D"
                : "#ffff00"
          }
        />
        <p
          className={[
            "",
            theme === "light" ? "" : "nav__theme-button__yellow-text",
          ].join(" ")}
        >
          {t(theme === "light" ? "light" : "dark")}
        </p>
        <div
          className={`nav__theme-button__toggle ${
            IS_RTL ? "nav__theme-button__toggle--rtl" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Toggle
            isToggled={theme === "dark"}
            shouldChangeState
            setParentState={toggleTheme}
            size="sm"
          />
        </div>
      </div>
    );
  };

  const handleProfileClick = () => {
    if (width >= 1050 && showProfile) {
      // On desktop, toggle dropdown instead of navigating
      setProfileDropdownShown(!profileDropdownShown);
      setNotificationsDropdownShown(false);
      setLanguagesShown(false);
      setCountriesShown(false);
      closePageDropdown();
    } else {
      // On mobile, navigate to profile details
      const url = `/${renderIn}/${localStorage.getItem("language")}/details`;
      if (isInConsultation) {
        window.open(url, "_blank");
      } else {
        navigate(`/${renderIn}/${localStorage.getItem("language")}/details`);
      }
    }
  };

  const isInProfile =
    pathname.includes("profile") || pathname.includes("details");

  let items = [];
  let hasGroupWithControls = false;
  let hasGroupWithAccessibilityController = false;

  if (width < 1050 && (mobilePages || menuPages)) {
    // Add profile container at the top of mobile menu
    if (showProfile) {
      items.push({
        value: (
          <div className="nav__profile--mobile-in-list">
            <div className="nav__profile nav__profile--mobile-layout">
              {showProfilePicture && (
                <img
                  src={imageURL}
                  alt="profile-image"
                  className="nav__profile__image nav__profile__image--no-pointer"
                />
              )}
              <div className="nav__profile__info">
                <p className="nav__profile__name">{clientName || "Guest"}</p>
                <p className="nav__profile__edit" onClick={handleProfileClick}>
                  {t("edit_profile")}
                </p>
              </div>
              <Icon
                classes="nav__profile__logout-icon"
                name="exit"
                size="md"
                onClick={handleLogout}
              />
            </div>
          </div>
        ),
      });
    }

    // Mobile: Use mobilePages/menuPages with groups
    (mobilePages || menuPages).forEach((group) => {
      // Add group name if it exists
      if (group.name) {
        items.push({
          value: (
            <div className="nav__group-name" role="heading">
              <p className="">{group.name}</p>
            </div>
          ),
        });
      }

      // Add pages in the group
      group.pages?.forEach((page) => {
        const url = `${
          renderIn === "website" ? "" : `/${renderIn}`
        }/${localStorage.getItem("language")}${page.url}`;

        items.push({
          value:
            isTmpUser && page.url === "/consultations" ? (
              <div
                onClick={isTmpUserAction}
                className="nav__item"
                role="button"
              >
                <div className="nav__item__content">
                  {page.icon && (
                    <Icon
                      name={page.icon}
                      size="md"
                      classes="nav__item__icon"
                      color={theme === "light" ? "#20809e" : "#ffffff"}
                    />
                  )}
                  <p>{page.name}</p>
                </div>
              </div>
            ) : (
              <NavLink
                target={isInConsultation ? "_blank" : "_self"}
                to={url}
                className={({ isActive }) =>
                  "nav__item" + (isActive ? " nav__item--current" : "")
                }
                onClick={() => handleNavbarLinkClick(page)}
                end={page.exact ? page.exact : false}
                role="button"
              >
                <div className="nav__item__content">
                  {page.icon && (
                    <Icon
                      name={page.icon}
                      size="md"
                      classes="nav__item__icon"
                      color={theme === "light" ? "#20809e" : "#ffffff"}
                    />
                  )}
                  <p>{page.name}</p>
                </div>
              </NavLink>
            ),
          onClick: scrollTop,
        });
      });

      // Add controls within the group if props are set
      if (group.hasLanguageSelector) {
        hasGroupWithControls = true;
        items.push({
          value: (
            <div
              className={[
                "nav__globe",
                "nav__item",
                languagesShown ? "nav__globe--expanded" : "",
                "nav__languages--mobile",
              ].join(" ")}
              role="button"
              tabIndex="0"
              onClick={() => {
                toggleLanguages();
              }}
            >
              <p
                className="text nav__current-language"
                style={{
                  color:
                    theme === "highContrast"
                      ? "#ffff00"
                      : theme !== "light"
                        ? "#fff"
                        : "#0e202f",
                }}
              >
                {currentLanguageCode}
              </p>
              <Icon
                name="arrow-chevron-down"
                size="sm"
                color={theme === "highContrast" ? "#ffff00" : "#20809e"}
              />
            </div>
          ),
        });
      }

      if (group.hasDarkModeSeletor && hasThemeButton) {
        hasGroupWithControls = true;
        items.push({
          value: themeButton(),
        });
      }

      if (group.hasAccessibilityController) {
        hasGroupWithControls = true;
        hasGroupWithAccessibilityController = true;
        const shouldRender = renderIn === "client" || renderIn === "website";
        if (shouldRender) {
          items.push({
            value: (
              <AccessibilityController
                classes={`nav__accessibility-controller ${
                  IS_RTL ? "nav__accessibility-controller--rtl" : ""
                } nav__accessibility-controller--mobile`}
                t={t}
              />
            ),
          });
        }
      }
    });
  } else {
    pages.forEach((page, index) => {
      if (page.isDropdown) {
        const isActive = page.dropdownItems?.some((item) =>
          pathname.includes(
            item.url.replace("?tab=articles", "").replace("?", ""),
          ),
        );

        items.push({
          value: (
            <div
              className={[
                "nav__item",
                "nav__dropdown-item",
                activeDropdown === index ? "nav__dropdown-item--expanded" : "",
                isActive ? "nav__item--current" : "",
              ].join(" ")}
              role="button"
              onMouseEnter={(e) => handleDropdownHover(index, e)}
              onMouseLeave={handleDropdownLeave}
              onClick={() => handleDropdownClick(index)}
            >
              <p>{page.name}</p>
              <Icon
                name="arrow-chevron-down"
                size="sm"
                color={theme === "highContrast" ? "#ffff00" : "#20809e"}
              />
            </div>
          ),
          onClick: scrollTop,
        });
      } else {
        // Handle regular pages
        const url = `${
          renderIn === "website" ? "" : `/${renderIn}`
        }/${localStorage.getItem("language")}${page.url}`;

        items.push({
          value:
            isTmpUser && page.url === "/consultations" ? (
              <div
                onClick={isTmpUserAction}
                className="nav__item"
                role="button"
              >
                <p>{page.name}</p>
              </div>
            ) : (
              <NavLink
                target={isInConsultation ? "_blank" : "_self"}
                to={url}
                className={({ isActive }) =>
                  "nav__item" + (isActive ? " nav__item--current" : "")
                }
                onClick={() => handleNavbarLinkClick(page)}
                end={page.exact ? page.exact : false}
                role="button"
              >
                <div className="nav__item__content">
                  <Icon
                    name={page.icon}
                    size="md"
                    classes="nav__item__icon"
                    color={theme === "light" ? "#6989A4" : "#ffffff"}
                  />
                  <p>{page.name}</p>
                </div>
                {/* <Icon
                  name={IS_RTL ? "arrow-chevron-back" : "arrow-chevron-forward"}
                  size="sm"
                  classes="nav__item__icon"
                  color={theme === "highContrast" ? "#ffff00" : "#20809e"}
                /> */}
              </NavLink>
            ),
          onClick: scrollTop,
        });
      }
    });
  }

  // Only add standalone language selector if not already in a group
  if (width < 1050 && !hasGroupWithControls) {
    items.push({
      value: (
        <div
          className={[
            "nav__globe",
            "nav__item",
            languagesShown ? "nav__globe--expanded" : "",
            "nav__languages--mobile",
          ].join(" ")}
          role="button"
          tabIndex="0"
          onClick={() => {
            toggleLanguages();
          }}
        >
          <p
            className="text nav__current-language"
            style={{
              color:
                theme === "highContrast"
                  ? "#ffff00"
                  : theme !== "light"
                    ? "#fff"
                    : "#0e202f",
            }}
          >
            {currentLanguageCode}
          </p>
          <Icon
            name="arrow-chevron-down"
            size="sm"
            color={theme === "highContrast" ? "#ffff00" : "#20809e"}
          />
        </div>
      ),
    });
  }

  if (showCountries && width < 1050) {
    items.push({
      value: (
        <div
          className={[
            "nav__country",
            "nav__item",
            countriesShown ? "nav__country--expanded" : "",
          ].join(" ")}
          role="button"
          tabIndex="0"
          onClick={() => {
            toggleCountries();
          }}
        >
          {selectedCountry.iconName && (
            <IconFlag flagName={selectedCountry.iconName} />
          )}
          {width < 1050 && <p>{"Country"}</p>}
          <Icon
            name="arrow-chevron-down"
            size="sm"
            color={theme === "highContrast" ? "#ffff00" : "#20809e"}
          />
        </div>
      ),
    });
  }

  // Theme button - only add to items array for mobile if not already in a group
  if (hasThemeButton && width < 1050 && !hasGroupWithControls) {
    items.push({
      value: themeButton(),
    });
  }

  const handleCountryClick = (country) => {
    if (country.value === selectedCountry.value) {
      return;
    }
    const subdomain = window.location.hostname.split(".")[0];
    if (!window.location.href.includes("localhost")) {
      const label = country.label.toLocaleLowerCase();
      let newUrl;
      if (subdomain === "usupport" && label !== "global") {
        newUrl = window.location.href.replace(subdomain, `${label}.usupport`);
      } else if (country.value === "global") {
        newUrl = window.location.href.replace(`${subdomain}.`, "");
      } else if (subdomain === "staging") {
        newUrl = window.location.href.replace(subdomain, `${label}.staging`);
      } else {
        newUrl = window.location.href.replace(subdomain, label);
      }

      window.location.href = newUrl;
    } else {
      if (setInitialCountry) {
        setInitialCountry(country);
      }
      if (setLanguages) {
        setLanguages(country.languages);
      }
      setSelectedCountry(country);
      setCountriesShown(false);

      if (setIsPodcastsActive) {
        setIsPodcastsActive(country.podcastsActive);
      }
      if (setIsVideosActive) {
        setIsVideosActive(country.videosActive);
      }

      localStorage.setItem("country_id", country.countryID);
      localStorage.setItem("country", country.value);
      localStorage.setItem("currency_symbol", country.currencySymbol);
      window.dispatchEvent(new Event("countryChanged"));
    }
  };

  const handleLanguageClick = (language = { value: "en" }) => {
    setSelectedLanguage(language);
    setLanguagesShown(false);
    i18n.changeLanguage(language.value);
    localStorage.setItem("language", language.value);
    if (renderIn === "client" || renderIn === "provider") {
      userSvc.changeLanguage(language.value).catch((err) => {
        console.log(err, "Error when changing language");
      });
    }
    window.dispatchEvent(new Event("languageChanged"));
    replaceLanguageInUrl(language.value);
  };

  const toggleLanguages = () => {
    if (!languagesShown) {
      setLanguagesShown(true);
      setActiveDropdown(null);
      closePageDropdown();
    }
  };

  const toggleCountries = () => {
    if (!countriesShown) {
      setCountriesShown(true);
    }
    setLanguagesShown(false);
    setActiveDropdown(null);
    closePageDropdown();
  };

  const renderCtaLoginMobile = () => {
    if (width < 1050 && showCta) return ctaLogin;
  };

  const renderCtaDesktop = () => {
    if (width >= 1050 && showCta) return ctaLogin;
  };

  const renderNotificationIconMobile = () => {
    if (width < 1050 && showProfile) return notificationIcon;
  };

  const renderWelcomeText = () => {
    if (width >= 1050) return null;

    return <p className="nav__welcome-text">Welcome back</p>;
  };

  const renderProfileContainerMobile = () => {
    if (width < 1050 && showProfile) {
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

  const getLanguageTriggerColor = () => {
    if (languagesShown) {
      if (theme === "highContrast") {
        return "#ffff00";
      }
      return "#20809e";
    }

    if (theme === "highContrast") {
      return "#ffff00";
    }

    return theme !== "light" ? "#fff" : "#0e202f";
  };

  const renderProfileContainerDesktop = () => {
    if (width >= 1050 && showProfile) {
      return (
        <div className="nav__profile-wrapper">
          <div
            className={[
              "nav__globe",
              "nav__item",
              languagesShown ? "nav__globe--expanded" : "",
            ].join(" ")}
            role="button"
            tabIndex="0"
            onClick={() => {
              toggleLanguages();
            }}
          >
            <p
              className="text nav__current-language"
              style={{ color: getLanguageTriggerColor() }}
            >
              {currentLanguageCode}
            </p>
            <Icon
              name="arrow-chevron-down"
              size="sm"
              color={getLanguageTriggerColor()}
            />
          </div>
          {showCountries && (
            <div
              className={[
                "nav__country",
                "nav__item",
                countriesShown ? "nav__country--expanded" : "",
              ].join(" ")}
              role="button"
              tabIndex="0"
              onClick={() => {
                toggleCountries();
              }}
            >
              {selectedCountry.iconName && (
                <IconFlag flagName={selectedCountry.iconName} />
              )}
              <Icon
                name="arrow-chevron-down"
                size="sm"
                color={getLanguageTriggerColor()}
              />
            </div>
          )}
          {profileContainer}
        </div>
      );
    }
  };

  const renderLanguageSelectorDesktop = () => {
    // Only render if profile is not shown (language selector is included in profile wrapper when profile is shown)
    if (width >= 1050 && !showProfile) {
      return (
        <div className="nav__profile-wrapper">
          <div
            className={[
              "nav__globe",
              "nav__item",
              languagesShown ? "nav__globe--expanded" : "",
            ].join(" ")}
            role="button"
            tabIndex="0"
            onClick={() => {
              toggleLanguages();
            }}
          >
            <p
              className="text nav__current-language"
              style={{ color: getLanguageTriggerColor() }}
            >
              {currentLanguageCode}
            </p>
            <Icon
              name="arrow-chevron-down"
              size="sm"
              color={getLanguageTriggerColor()}
            />
          </div>
          {showCountries && (
            <div
              className={[
                "nav__country",
                "nav__item",
                countriesShown ? "nav__country--expanded" : "",
              ].join(" ")}
              role="button"
              tabIndex="0"
              onClick={() => {
                toggleCountries();
              }}
            >
              {selectedCountry.iconName && (
                <IconFlag flagName={selectedCountry.iconName} />
              )}
              <Icon
                name="arrow-chevron-down"
                size="sm"
                color={getLanguageTriggerColor()}
              />
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const ctaLogin = buttonText ? (
    <NewButton
      size={width < 1050 || width >= 1200 ? "sm" : "xs"}
      classes="nav__login"
      onClick={() => {
        const country = localStorage.getItem("country");
        if (country === "global") {
          window.location.href = `/client/${localStorage.getItem("language")}`;
        } else {
          window.location.href = `/client/${localStorage.getItem(
            "language",
          )}/dashboard`;
        }
        scrollTop();
      }}
      web={width >= 1110}
      label={buttonText}
    />
  ) : null;

  const handleNotificationIconClick = () => {
    if (isTmpUser) {
      setIsNavbarExpanded(false);
      isTmpUserAction();
    } else if (renderNotificationsContent) {
      setNotificationsDropdownShown(!notificationsDropdownShown);
      setIsNavbarExpanded(false);
      setProfileDropdownShown(false);
      setLanguagesShown(false);
      setCountriesShown(false);
      closePageDropdown();
    } else if (isInConsultation) {
      window.open(
        `/${renderIn}/${localStorage.getItem("language")}/notifications`,
        "_blank",
      );
    } else {
      navigate(
        `/${renderIn}/${localStorage.getItem("language")}/notifications`,
      );
    }
  };

  const isInNotifications =
    pathname.includes("notifications") || notificationsDropdownShown;

  const notificationIcon = (
    <div
      className="nav__profile__notification-wrapper"
      onClick={handleNotificationIconClick}
    >
      <Icon
        classes="nav__profile__notification-icon"
        name={`notifications`}
        size="md"
        color={
          isInNotifications
            ? "#20809e"
            : theme === "highContrast"
              ? "#ffff00"
              : theme !== "light"
                ? "#fff"
                : "#0e202f"
        }
      />
      {hasUnreadNotifications && (
        <div className="nav__profile__notification-wrapper--unread" />
      )}
    </div>
  );

  const profileContainer = (
    <div className="nav__profile">
      {width >= 1050 && showNotifications && notificationIcon}
      {showProfilePicture && (
        <img
          src={imageURL}
          alt="profile-image"
          className="nav__profile__image"
          onClick={handleProfileClick}
        />
      )}
      {(renderIn === "global-admin" || renderIn === "country-admin") && (
        <p
          onClick={handleProfileClick}
          className={` ${isInProfile ? "nav__profile__text-active" : ""}`}
        >
          {yourProfileText}
        </p>
      )}
    </div>
  );

  const renderDropdownContent = (type) => {
    const data =
      type === "languages"
        ? languages || []
        : countries.filter((x) => x.value !== "PS") || [];

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
          let isSelected = false;
          if (type === "languages") {
            isSelected =
              option.value.toLowerCase() ===
              selectedLanguage.value.toLowerCase();
          } else {
            isSelected =
              option.value.toLowerCase() ===
              selectedCountry.value.toLowerCase();
          }

          const baseClass =
            type === "languages"
              ? "nav__dropdown-content__lang"
              : "nav__dropdown-content__country";

          const optionClasses =
            type === "languages" && isSelected
              ? `${baseClass} ${baseClass}--selected`
              : baseClass;

          return (
            <div
              onClick={(e) => handleOptionSelect(e, option)}
              key={option.value}
              className={optionClasses}
            >
              {type === "countries" && <IconFlag flagName={option.iconName} />}
              <p
                className={`nav__dropdown-content__lang-label ${
                  isSelected
                    ? "nav__dropdown-content__lang-label--selected"
                    : ""
                }`}
              >
                {`${option.label} ${
                  option.label !== "English" && option.label !== "Global"
                    ? `(${option.localName})`
                    : ""
                }`}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  // Render page dropdown content
  const renderPageDropdownContent = (pageIndex) => {
    const page = pages[pageIndex];
    if (!page?.dropdownItems) return null;

    return (
      <div className="nav__page-dropdown-content">
        {page.dropdownItems.map((item) => {
          // Check if this dropdown item is currently active
          const isActive = pathname.includes(
            item.url.replace("?tab=articles", "").replace("?", ""),
          );

          return (
            <div
              key={item.url}
              onClick={() => handleDropdownItemClick(item.url)}
              className={[
                "nav__page-dropdown-item",
                isActive ? "nav__page-dropdown-item--active" : "",
              ].join(" ")}
            >
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAccessibilityController = () => {
    const shouldRender = renderIn === "client" || renderIn === "website";

    if (shouldRender) {
      return (
        <AccessibilityController
          classes={`nav__accessibility-controller ${
            IS_RTL ? "nav__accessibility-controller--rtl" : ""
          }`}
          t={t}
        />
      );
    }
  };

  // Filter menuPages to exclude pages already in main navigation
  const getFilteredMenuPages = () => {
    if (!menuPages || !pages) return [];

    const mainPageUrls = pages
      .map((page) => {
        // Handle dropdown pages
        if (page.isDropdown && page.dropdownItems) {
          return page.dropdownItems.map((item) => item.url);
        }
        return page.url;
      })
      .flat();

    return menuPages
      .map((group) => {
        // Filter out pages that are already in main navigation
        const filteredPages = group.pages?.filter((page) => {
          const pageUrl = page.url.split("?")[0]; // Remove query params for comparison
          return !mainPageUrls.some((mainUrl) => {
            const mainUrlClean = mainUrl.split("?")[0];
            return pageUrl === mainUrlClean;
          });
        });

        return {
          ...group,
          pages: filteredPages,
        };
      })
      .filter((group) => {
        // Include groups that have pages or theme selector (for desktop dropdown)
        // Only include theme selector group if hasDarkModeSeletor is explicitly true
        return (
          (group.pages && group.pages.length > 0) ||
          (group.hasDarkModeSeletor === true && hasThemeButton && width >= 1050)
        );
      });
  };

  const handleRedirect = (redirectTo) => {
    if (
      (redirectTo === "/details" ||
        redirectTo === "/notification-preferences") &&
      isTmpUser
    ) {
      openRegistrationModal();
    } else {
      navigate(`/${renderIn}/${localStorage.getItem("language")}${redirectTo}`);
    }
  };

  const renderProfileDropdownContent = () => {
    const filteredMenuPages = getFilteredMenuPages();

    return (
      <div className="nav__profile-dropdown-content">
        {/* Close Button */}
        <div
          className="nav__profile-dropdown-close"
          onClick={() => setProfileDropdownShown(false)}
          role="button"
          tabIndex="0"
          aria-label="Close menu"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setProfileDropdownShown(false);
            }
          }}
        >
          <Icon
            name="close-x"
            size="md"
            color={theme === "dark" ? "#c1d7e0" : undefined}
          />
        </div>

        {/* Profile Header */}
        {showProfile && (
          <div className="nav__profile-dropdown-header">
            <div className="nav__profile nav__profile--mobile-layout">
              {showProfilePicture && (
                <img
                  src={imageURL}
                  alt="profile-image"
                  className="nav__profile__image nav__profile__image--no-pointer"
                />
              )}
              <div className="nav__profile__info">
                <p className="nav__profile__name">{clientName || "Guest"}</p>
                <p
                  className="nav__profile__edit"
                  onClick={() => handleRedirect("/details")}
                >
                  {t("edit_profile")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        {filteredMenuPages.map((group, groupIndex) => (
          <div key={groupIndex} className="nav__profile-dropdown-group">
            {group.name && (
              <div className="nav__profile-dropdown-group-name">
                <p>{group.name}</p>
              </div>
            )}

            {group.pages?.map((page) => {
              const url = `${
                renderIn === "website" ? "" : `/${renderIn}`
              }/${localStorage.getItem("language")}${page.url}`;

              return (
                <NavLink
                  key={page.url}
                  target={isInConsultation ? "_blank" : "_self"}
                  to={url}
                  className={({ isActive }) =>
                    "nav__profile-dropdown-item" +
                    (isActive ? " nav__profile-dropdown-item--active" : "")
                  }
                  onClick={() => {
                    setProfileDropdownShown(false);
                    scrollTop();
                  }}
                  end={page.exact ? page.exact : false}
                >
                  <div className="nav__profile-dropdown-item__content">
                    {page.icon && (
                      <Icon
                        name={page.icon}
                        size="md"
                        classes="nav__profile-dropdown-item__icon"
                        color={theme === "light" ? "#20809e" : "#ffffff"}
                      />
                    )}
                    <p>{page.name}</p>
                  </div>
                </NavLink>
              );
            })}

            {/* Theme Button - Only show in desktop dropdown if hasDarkModeSeletor is true in menuPages */}
            {group.hasDarkModeSeletor === true &&
              hasThemeButton &&
              width >= 1050 && (
                <div className="nav__profile-dropdown-theme-button">
                  {themeButton(true)}
                </div>
              )}
          </div>
        ))}
        {/* Logout button at bottom of dropdown */}
        {width >= 1050 && (
          <div className="nav__profile-dropdown-footer">
            <div
              className="nav__profile-dropdown-item nav__profile-dropdown-item--logout"
              onClick={handleLogout}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLogout();
                }
              }}
            >
              <div className="nav__profile-dropdown-item__content">
                <Icon
                  name="exit"
                  size="md"
                  classes="nav__profile-dropdown-item__icon"
                  color={theme === "light" ? "#20809e" : "#ffffff"}
                />
                <p>{t("logout")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const defaultLogo = `${AMAZON_S3_BUCKET}/logo-horizontal${
    theme === "light" ? "" : "-dark"
  }`;

  let logoUrl = defaultLogo;
  if (
    selectedCountry?.value &&
    selectedCountry.value !== "global" &&
    renderIn !== "global-admin"
  ) {
    logoUrl = `${AMAZON_S3_BUCKET}/logo-horizontal-${selectedCountry.value}${
      theme === "light" ? "" : "-dark"
    }`;
  } else {
    logoUrl = defaultLogo;
  }

  const renderLeftContainer = () => {
    return (
      <div className="nav__left-container">
        <img
          className="nav__logo"
          src={logoUrl}
          alt="logo"
          tabIndex="0"
          onClick={() => {
            const language = localStorage.getItem("language");
            if (isInConsultation) {
              window.open(`/${renderIn}/${language}`, "_blank");
            } else {
              const url =
                renderIn === "website" ? `/` : `/${renderIn}/${language}`;
              navigate(url);
              scrollTop();
            }
          }}
        />
        <div className="nav__clickable-area" onClick={toggleNavbar}>
          <Icon
            classes={`nav__toggler ${IS_RTL ? "nav__toggler--rtl" : ""}`}
            name={isNavbarExpanded ? "close-x" : "navbar-burger"}
            size="md"
            color={theme === "light" ? "#373737" : "#fff"}
          />
        </div>
        {renderCtaLoginMobile()}
        {/* {renderWelcomeText()} */}
        {showNotifications && renderNotificationIconMobile()}
      </div>
    );
  };

  const renderRightContainer = () => {
    return (
      <div className="nav__right-container">
        {renderProfileContainerDesktop()}
        {renderLanguageSelectorDesktop()}
        {renderCtaDesktop()}
      </div>
    );
  };

  return (
    <>
      <nav
        className={[
          "nav",
          "collapsible",
          renderIn === "website" ? "nav--website" : "",
          `${isNavbarExpanded ? "collapsible--expanded" : ""}`,
          `${IS_RTL ? "nav--rtl" : ""}`,
          `${isScrolled ? "nav--scrolled" : ""}`,
        ].join(" ")}
      >
        {renderLeftContainer()}
        <List
          items={items}
          inline={width >= 1050 ? true : false}
          classes={["nav__list", width < 1050 ? "collapsible__content" : ""]}
          aria-expanded={isNavbarExpanded}
        />
        {renderRightContainer()}
        {/* Only render accessibility controller at bottom if not in mobile menu group */}
        {!(width < 1050 && hasGroupWithAccessibilityController) &&
          renderAccessibilityController()}
      </nav>

      <OutsideClickHandler
        onOutsideClick={() => {
          if (languagesShown) {
            setLanguagesShown(false);
          } else if (countriesShown) {
            setCountriesShown(false);
          } else if (notificationsDropdownShown) {
            setNotificationsDropdownShown(false);
          } else if (profileDropdownShown) {
            setProfileDropdownShown(false);
          } else if (activeDropdown !== null) {
            closePageDropdown();
          }
        }}
      >
        {/* Language/Country Dropdowns */}
        <div
          className={`
          ${languagesShown ? "nav__languages" : "nav__countries "} ${
            IS_RTL ? "nav__languages--rtl" : ""
          }
          ${IS_PS ? "nav__languages--playandheal" : ""}
          ${languagesShown ? "nav__languages--shown" : ""}
          ${countriesShown ? "nav__countries--shown" : ""}
          ${
            (languagesShown &&
              !showProfilePicture &&
              renderIn !== "country-admin" &&
              renderIn !== "admin-global") ||
            renderIn === "website"
              ? "nav__languages--no-profile"
              : ""
          }
          ${renderIn === "global-admin" ? "nav__languages--global-admin" : ""}
          ${renderIn === "country-admin" ? "nav__languages--country-admin" : ""}
          ${renderIn === "client" ? "nav__languages--client" : ""}
          `}
        >
          <Box
            classes={`nav__languages__content ${
              languagesShown ? "nav__languages__content--shown" : ""
            } ${countriesShown ? "nav__countries__content--shown" : ""}`}
          >
            {(languagesShown || countriesShown) && (
              <div
                className="nav__languages__content__close"
                onClick={() => {
                  setLanguagesShown(false);
                  setCountriesShown(false);
                }}
                role="button"
                tabIndex="0"
                aria-label="Close menu"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLanguagesShown(false);
                    setCountriesShown(false);
                  }
                }}
              >
                <Icon
                  name="close-x"
                  size="md"
                  color={theme === "dark" ? "#c1d7e0" : undefined}
                />
              </div>
            )}
            {width >= 1050 && (
              <h4 className="nav__languages__content__header">
                {languagesShown ? languageLabel : countryLabel}
              </h4>
            )}
            {languagesShown ? renderDropdownContent("languages") : null}
            {countriesShown ? renderDropdownContent("countries") : null}
          </Box>
        </div>

        {/* Page Dropdowns - Only show on desktop */}
        {(activeDropdown !== null || isDropdownAnimating) && width >= 1050 && (
          <div
            className={[
              "nav__page-dropdown",
              isDropdownVisible ? "nav__page-dropdown--visible" : "",
              isDropdownAnimating ? "nav__page-dropdown--animating" : "",
            ].join(" ")}
            style={{
              left: `${dropdownPosition.left}px`,
              top: `${dropdownPosition.top}px`,
            }}
            onMouseEnter={handleDropdownContentEnter}
            onMouseLeave={handleDropdownContentLeave}
          >
            <Box
              classes={[
                "nav__page-dropdown__content",
                isDropdownVisible ? "nav__page-dropdown__content--visible" : "",
              ].join(" ")}
            >
              {activeDropdown !== null &&
                renderPageDropdownContent(activeDropdown)}
            </Box>
          </div>
        )}

        {/* Notifications Dropdown */}
        {notificationsDropdownShown &&
          renderNotificationsContent &&
          (width >= 1050 ? (
            <div
              className={[
                "nav__notifications-dropdown",
                IS_RTL ? "nav__notifications-dropdown--rtl" : "",
              ].join(" ")}
            >
              <Box classes="nav__notifications-dropdown__box">
                <div className="nav__notifications-dropdown__content">
                  <div
                    className="nav__notifications-dropdown__close"
                    onClick={() => setNotificationsDropdownShown(false)}
                    role="button"
                    tabIndex="0"
                    aria-label="Close notifications"
                  >
                    <Icon
                      name="close-x"
                      size="md"
                      color={theme === "dark" ? "#c1d7e0" : undefined}
                    />
                  </div>
                  {renderNotificationsContent(() =>
                    setNotificationsDropdownShown(false),
                  )}
                </div>
              </Box>
            </div>
          ) : (
            <div
              className={[
                "nav__notifications-mobile-panel",
                IS_RTL ? "nav__notifications-mobile-panel--rtl" : "",
              ].join(" ")}
            >
              <div className="nav__notifications-mobile-panel__header">
                <div
                  className="nav__notifications-mobile-panel__close"
                  onClick={() => setNotificationsDropdownShown(false)}
                  role="button"
                  tabIndex="0"
                  aria-label="Close notifications"
                >
                  <Icon
                    name="close-x"
                    size="md"
                    color={theme === "dark" ? "#c1d7e0" : undefined}
                  />
                </div>
              </div>
              {renderNotificationsContent(() =>
                setNotificationsDropdownShown(false),
              )}
            </div>
          ))}

        {/* Profile Dropdown - Only show on desktop */}
        {profileDropdownShown && width >= 1050 && (
          <div
            className={[
              "nav__profile-dropdown",
              IS_RTL ? "nav__profile-dropdown--rtl" : "",
            ].join(" ")}
          >
            <Box classes="nav__profile-dropdown__box">
              {renderProfileDropdownContent()}
            </Box>
          </div>
        )}
      </OutsideClickHandler>
    </>
  );
};
