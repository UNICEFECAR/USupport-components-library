import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Icon } from "../../icons/Icon";
import { List } from "../../lists/List";
import { Button } from "../../buttons/Button";
import { CollapsibleCountry } from "../../collapsibles/CollapsibleCountry";
import { Box } from "../../boxes/Box";
import OutsideClickHandler from "react-outside-click-handler";

import "./navbar.scss";

import logo from "../../../assets/logo.png";

/**
 * Navbar
 *
 * The base navbar used throughout all of the USupport Web Interfaces
 *
 * @return {jsx}
 */
export const Navbar = ({ pages, countries }) => {
  const navigateTo = useNavigate();
  let { width } = useWindowDimensions();
  const scrollTop = () => window.scrollTo(0, 0);

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [countriesShown, setCountriesShown] = useState(false);

  let items = [];
  pages.forEach((page) => {
    items.push({
      value: (
        <NavLink
          to={page.url ? page.url : "#"}
          className={({ isActive }) =>
            "nav__item" + (isActive ? " nav__item--current" : "")
          }
          onClick={() => toggleNavbar()}
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
          countriesShown ? "nav__globe--expanded" : "",
        ].join(" ")}
        onClick={() => toggleCountries()}
      >
        <Icon name="globe" size="md" />
        {width < 900 && <p className="paragraph">Country &amp; Language</p>}
        <Icon name="arrow-chevron-down" size="sm" color="#20809e" />
      </div>
    ),
  });

  const ctaLogin = (
    <Button
      type="primary"
      size={width < 900 || width >= 1200 ? "sm" : "xs"}
      color="green"
      classes="nav__login"
      onClick={() => {
        navigateTo("/login");
        scrollTop();
      }}
      web={width >= 900}
    >
      Go to app
    </Button>
  );

  function toggleNavbar() {
    if (width < 900) {
      setIsNavbarExpanded((prev) => !prev);
      setCountriesShown(false);
    }
  }

  function handleLanguageClick(language) {
    console.log(`Change language to ${language}`);
    toggleCountries();
  }

  const toggleCountries = () => {
    setCountriesShown((prev) => !prev);
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
          src={logo}
          alt="logo"
          onClick={() => {
            navigateTo("/");
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
        {width < 900 && ctaLogin}
        <List
          items={items}
          inline={width >= 900 ? true : false}
          classes={["nav__list", width < 900 ? "collapsible__content" : ""]}
          aria-expanded={isNavbarExpanded}
        />
        {width >= 900 && ctaLogin}
      </nav>
      <OutsideClickHandler onOutsideClick={() => setCountriesShown(false)}>
        <div
          className={`nav__countries ${
            countriesShown ? "nav__countries--shown" : ""
          }`}
        >
          <Box
            classes={`nav__countries__content ${
              countriesShown ? "nav__countries__content--shown" : ""
            }`}
          >
            {width >= 900 && <h4>Country &amp; Language</h4>}
            {countries.map((country, index) => {
              return (
                <CollapsibleCountry
                  country={country}
                  onLanguageClick={(language) => {
                    handleLanguageClick(language);
                  }}
                  key={index}
                />
              );
            })}
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
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
