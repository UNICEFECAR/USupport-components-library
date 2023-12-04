import React, { useState, useEffect, useCallback, useContext } from "react";

import { Block } from "../../blocks/Block";
import { Grid } from "../../grids/Grid";
import { GridItem } from "../../grids/GridItem";
import { List } from "../../lists/List";
import { Icon } from "../../icons/Icon";
import { Button } from "../../buttons/Button";
import { IconWithText } from "../../icons/IconWithText";
import { StaticImage } from "../../images/StaticImage";
import { ThemeContext } from "../../../utils/";

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
  contactUsText,
  navigate,
  Link,
  showSocials = true,
}) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);

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

  let list1 = [];
  lists.list1.forEach((listItem) => {
    list1.push({
      value: (
        <Link to={listItem.url ? listItem.url : "#"} rel="noopener noreferrer">
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
        <Link to={listItem.url ? listItem.url : "#"} rel="noopener noreferrer">
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
        <IconWithText
          iconName={listItem.iconName}
          text={<p className="text">{listItem.value}</p>}
          onClick={() => handleContactsClick(listItem.onClick)}
        />
      ),
    });
  });

  return (
    <Block classes="footer" animation={null} isFooter={true}>
      <Grid>
        <GridItem xs={4} md={8} lg={4}>
          <StaticImage
            png={logoUrl}
            webp={logoUrl}
            imageClasses="footer__logo"
            alt="logo"
            tabIndex="0"
            onClick={() => {
              navigate("/");
            }}
          />
          {showSocials && (
            <div>
              <Icon
                classes="footer__icon"
                name="linkedin"
                size={"lg"}
                onClick={() => handleContactsClick("linkedin")}
              />
              <Icon
                classes="footer__icon"
                name="twitter"
                size={"lg"}
                onClick={() => handleContactsClick("twitter")}
              />
              <Icon
                classes="footer__icon"
                name="facebook"
                size={"lg"}
                onClick={() => handleContactsClick("facebook")}
              />
            </div>
          )}
        </GridItem>
        <GridItem classes="footer__list-item" xs={2} md={2} lg={2}>
          <List items={list1} />
        </GridItem>
        <GridItem classes="footer__list-item" xs={2} md={2} lg={2}>
          <List items={list2} />
        </GridItem>
        <GridItem classes="footer__list-item" xs={4} md={4} lg={4}>
          <h4 className="footer__contact-us">{contactUsText}</h4>
          <List items={list3} />
        </GridItem>
        <GridItem classes="footer__copy-right-item" xs={4} md={8} lg={12}>
          <p className="small-text">©{currentYear} USupport</p>
        </GridItem>
      </Grid>
    </Block>
  );
};
