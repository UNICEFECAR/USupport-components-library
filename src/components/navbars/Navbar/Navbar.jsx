import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { Icon, IconFlag } from "../../icons";
import { List } from "../../lists";
import { Button } from "../../buttons";
import { Box } from "../../boxes";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { userSvc } from "../../../services";
import { ThemeContext, replaceLanguageInUrl } from "../../../utils";

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
  t,
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownAnimating, setIsDropdownAnimating] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(
    initialLanguage || englishLanguage
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
            selectedLanguage.value?.toLocaleLowerCase()
        )
      ) {
        const newLanguage = languages[0];
        const label = newLanguage.value.toLocaleLowerCase();
        handleLanguageClick(languages[0]);
        replaceLanguageInUrl(label);
      }
    }
  }, [countries, languages, selectedLanguage]);

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

  const themeButton = () => {
    const toggleTheme = () => {
      if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    return (
      <div onClick={toggleTheme} className="nav__theme-button">
        <Icon
          name={theme === "light" ? "dark-mode-switch" : "light-mode"}
          size="lg"
          classes="nav__theme-button__icon"
          color={theme === "light" ? "#20809E" : "#FDDA0D"}
        />
        <p
          className={[
            "paragraph",
            theme === "dark" && "nav__theme-button__yellow-text",
          ].join(" ")}
        >
          {t(theme === "light" ? "dark" : "light")}
        </p>
      </div>
    );
  };

  let items = [];
  pages.forEach((page, index) => {
    if (page.isDropdown) {
      // Handle dropdown pages
      if (width >= 1050) {
        // Desktop: Show as dropdown
        const isActive = page.dropdownItems?.some((item) =>
          pathname.includes(
            item.url.replace("?tab=articles", "").replace("?", "")
          )
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
              <p className="paragraph">{page.name}</p>
              <Icon name="arrow-chevron-down" size="sm" color="#20809e" />
            </div>
          ),
          onClick: scrollTop,
        });
      } else {
        // Mobile/Tablet: Show dropdown items as regular pages
        page.dropdownItems?.forEach((dropdownItem) => {
          const url = `${
            renderIn === "website" ? "" : `/${renderIn}`
          }/${localStorage.getItem("language")}${dropdownItem.url}`;

          items.push({
            value: (
              <NavLink
                target={isInConsultation ? "_blank" : "_self"}
                to={url}
                className={({ isActive }) =>
                  "nav__item" + (isActive ? " nav__item--current" : "")
                }
                onClick={() => handleNavbarLinkClick(dropdownItem)}
                role="button"
              >
                <p className="paragraph">{dropdownItem.name}</p>
              </NavLink>
            ),
            onClick: scrollTop,
          });
        });
      }
    } else {
      // Handle regular pages
      const url = `${
        renderIn === "website" ? "" : `/${renderIn}`
      }/${localStorage.getItem("language")}${page.url}`;

      items.push({
        value:
          isTmpUser && page.url === "/consultations" ? (
            <div onClick={isTmpUserAction} className="nav__item" role="button">
              <p className="paragraph">{page.name}</p>
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
              <p className="paragraph">{page.name}</p>
            </NavLink>
          ),
        onClick: scrollTop,
      });
    }
  });

  if (hasThemeButton) {
    items.push({
      value: themeButton(),
    });
  }

  items.push({
    value: (
      <div
        className={[
          "nav__globe",
          "nav__item",
          languagesShown ? "nav__globe--expanded" : "",
          width < 1050 ? "nav__languages--mobile" : "",
        ].join(" ")}
        role="button"
        tabIndex="0"
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
          role="button"
          tabIndex="0"
          onClick={() => {
            toggleCountries();
          }}
        >
          {selectedCountry.iconName && (
            <IconFlag flagName={selectedCountry.iconName} />
          )}
          {width < 1050 && <p className="paragraph">{"Country"}</p>}
          <Icon name="arrow-chevron-down" size="sm" color="#20809e" />
        </div>
      ),
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

  const handleProfileClick = () => {
    const url = `/${renderIn}/${localStorage.getItem("language")}/profile`;
    if (isInConsultation) {
      window.open(url, "_blank");
    } else {
      navigate(`/${renderIn}/${localStorage.getItem("language")}/profile`);
    }
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

  const renderProfileContainerDesktop = () => {
    if (width >= 1050 && showProfile) {
      return profileContainer;
    }
  };

  const ctaLogin = (
    <Button
      type="primary"
      size={width < 1050 || width >= 1200 ? "sm" : "xs"}
      color="green"
      classes="nav__login"
      onClick={() => {
        const country = localStorage.getItem("country");
        if (country === "global") {
          window.location.href = `/client/${localStorage.getItem("language")}`;
        } else {
          window.location.href = `/client/${localStorage.getItem(
            "language"
          )}/register-preview`;
        }
        scrollTop();
      }}
      web={width >= 1110}
    >
      {buttonText}
    </Button>
  );

  const handleNotificationIconClick = () => {
    if (isTmpUser) {
      setIsNavbarExpanded(false);
      isTmpUserAction();
    }
    if (isInConsultation) {
      window.open(
        `/${renderIn}/${localStorage.getItem("language")}/notifications`,
        "_blank"
      );
    } else {
      navigate(
        `/${renderIn}/${localStorage.getItem("language")}/notifications`
      );
    }
  };

  const isInNotifications = pathname.includes("notifications");
  const notificationIcon = (
    <div>
      <Icon
        classes="nav__profile__notification-icon"
        name={`notifications${hasUnreadNotifications ? "-unread" : ""}${
          isInNotifications ? "-active" : ""
        }`}
        size="md"
        onClick={handleNotificationIconClick}
      />
    </div>
  );

  const isInProfile =
    pathname.includes("profile") || pathname.includes("details");
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
          className={`paragraph ${
            isInProfile ? "nav__profile__text-active" : ""
          }`}
        >
          {yourProfileText}
        </p>
      )}
    </div>
  );

  const renderDropdownContent = (type) => {
    const data = type === "languages" ? languages || [] : countries || [];

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
            item.url.replace("?tab=articles", "").replace("?", "")
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
              <p className="paragraph">{item.name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const defaultLogo = `${AMAZON_S3_BUCKET}/logo-horizontal${
    theme === "dark" ? "-dark" : ""
  }`;

  let logoUrl = defaultLogo;
  if (
    selectedCountry?.value &&
    selectedCountry.value !== "global" &&
    renderIn !== "global-admin"
  ) {
    logoUrl = `${AMAZON_S3_BUCKET}/logo-horizontal-${selectedCountry.value}${
      theme === "dark" ? "-dark" : ""
    }`;
  } else {
    logoUrl = defaultLogo;
  }

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
          src={logoUrl}
          alt="logo"
          tabIndex="0"
          onClick={() => {
            const language = localStorage.getItem("language");
            if (isInConsultation) {
              window.open(`/${renderIn}/${language}`, "_blank");
            } else {
              const url =
                renderIn === "website"
                  ? `/${language}`
                  : `/${renderIn}/${language}`;
              navigate(url);
              scrollTop();
            }
          }}
        />
        <div className="nav__clickable-area" onClick={toggleNavbar}>
          <Icon
            classes="nav__toggler"
            name={isNavbarExpanded ? "close-x" : "navbar-burger"}
            size="md"
            color={theme === "dark" ? "#fff" : "#373737"}
          />
        </div>

        {renderCtaLoginMobile()}
        {showNotifications && renderNotificationIconMobile()}

        <List
          items={items}
          inline={width >= 1050 ? true : false}
          classes={["nav__list", width < 1050 ? "collapsible__content" : ""]}
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
          } else if (activeDropdown !== null) {
            closePageDropdown();
          }
        }}
      >
        {/* Language/Country Dropdowns */}
        <div
          className={`
          ${languagesShown ? "nav__languages" : "nav__countries "}
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
            {width >= 1050 && (
              <h4>{languagesShown ? languageLabel : countryLabel}</h4>
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
      isDropdown: PropTypes.bool,
      dropdownItems: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
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
      value: PropTypes.string,
      label: PropTypes.string,
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
