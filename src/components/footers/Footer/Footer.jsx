import React, { useState, useEffect, useCallback, useContext } from "react";

import { Block } from "../../blocks/Block";
import { Grid } from "../../grids/Grid";
import { GridItem } from "../../grids/GridItem";
import { List } from "../../lists/List";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import { IconWithText } from "../../icons/IconWithText";
import { StaticImage } from "../../images/StaticImage";
import { ThemeContext, useWindowDimensions } from "../../../utils/";

import { useEventListener } from "#hooks";

import "./footer.scss";

const AMAZON_S3_BUCKET = `${import.meta.env.VITE_AMAZON_S3_BUCKET}`;

/**
 * Footer
 *
 * The Footer block
 *
 * @return {jsx}
 */
export const Footer = ({
  lists,
  navigate,
  Link,
  renderIn,
  showSocials = true,
}) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  const defaultLogo = `${AMAZON_S3_BUCKET}/logo-horizontal`;
  const [logoUrl, setLogoUrl] = useState(defaultLogo);
  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem("country") || "KZ"
  );

  const handler = useCallback(() => {
    setSelectedCountry(localStorage.getItem("country"));
  }, []);
  useEventListener("countryChanged", handler);

  useEffect(() => {
    if (selectedCountry) {
      setLogoUrl(
        `${AMAZON_S3_BUCKET}/logo-horizontal-${selectedCountry}${
          theme === "dark" ? "-dark" : ""
        }`
      );
    } else {
      setLogoUrl(defaultLogo);
    }
  }, [selectedCountry, theme]);

  function handleContactsClick(platform) {
    let link = "";

    //TODO: Add links to the social media platforms
    switch (platform) {
      case "facebook":
        link = "https://www.facebook.com/";
        break;
      case "twitter":
        link = "https://twitter.com/";
        break;
      case "linkedin":
        link = "https://www.linkedin.com/";
        break;
      case "phone":
        link = "tel:+7 717 232 28 78";
        break;
      case "mail":
        link = "mailto:usupport@7digit.io";
        break;
      default:
        break;
    }

    if (link !== "") window.open(link, "_blank", "noreferrer").focus();
  }

  const getLink = (url) => {
    return `/${localStorage.getItem("language")}${
      renderIn === "website" ? "" : `/${renderIn}`
    }${url}`;
  };

  let list1 = [];
  lists.list1.forEach((listItem) => {
    list1.push({
      value: (
        <Link to={getLink(listItem.url)} rel="noopener noreferrer">
          <Button
            type="text"
            size="lg"
            label={listItem.name}
            classes="footer__link-button"
          />
        </Link>
      ),
    });
  });

  let list2 = [];
  lists.list2.forEach((listItem) => {
    list2.push({
      value: (
        <Link to={getLink(listItem.url)} rel="noopener noreferrer">
          <Button
            type="text"
            size="lg"
            label={listItem.name}
            classes="footer__link-button"
          />
        </Link>
      ),
    });
  });

  let list3 = [];
  lists.list3.forEach((listItem) => {
    list3.push({
      value: (
        <Link to={getLink(listItem.url)} rel="noopener noreferrer">
          <Button
            type="text"
            size="lg"
            label={listItem.name}
            classes="footer__link-button"
          />
        </Link>
      ),
    });
  });

  return (
    <Block classes="footer" animation={null} isFooter={true}>
      <Grid>
        <GridItem xs={4} md={8} lg={5}>
          <StaticImage
            png={logoUrl}
            webp={logoUrl}
            imageClasses="footer__logo"
            alt="logo"
            tabIndex="0"
            onClick={() => {
              navigate(`/${localStorage.getItem("language")}/`);
            }}
          />
          {showSocials && (
            <div>
              <Icon
                classes="footer__icon"
                name="linkedin"
                size={"lg"}
                onClick={() => handleContactsClick("linkedin")}
                color={theme === "dark" ? "20809E" : "#3D527B"}
              />
              <Icon
                classes="footer__icon"
                name="twitter"
                size={"lg"}
                onClick={() => handleContactsClick("twitter")}
                color={theme === "dark" ? "20809E" : "#3D527B"}
              />
              <Icon
                classes="footer__icon"
                name="facebook"
                size={"lg"}
                onClick={() => handleContactsClick("facebook")}
                color={theme === "dark" ? "20809E" : "#3D527B"}
              />
            </div>
          )}
        </GridItem>
        {width >= 768 && width < 1366 && <GridItem md={1} />}
        <GridItem classes="footer__list-item" xs={2} md={2} lg={2}>
          <List items={list1} />
        </GridItem>
        <GridItem classes="footer__list-item" xs={2} md={2} lg={2}>
          <List items={list2} />
        </GridItem>
        <GridItem classes="footer__list-item" xs={4} md={2} lg={2}>
          <List items={list3} />
        </GridItem>
        {width >= 768 && <GridItem md={1} lg={1} />}
        <GridItem classes="footer__copy-right-item" xs={4} md={8} lg={12}>
          <p className="small-text">©{currentYear} uSupport</p>
        </GridItem>
      </Grid>
    </Block>
  );
};
