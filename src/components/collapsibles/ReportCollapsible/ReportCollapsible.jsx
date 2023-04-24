import React from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";

import "./report-collapsible.scss";
import { Box } from "../../boxes";
import { Grid, GridItem } from "../../grids";
import { Icon } from "../../icons";
import { useWindowDimensions } from "../../../utils";
import { useState } from "react";

/**
 * ReportCollapsible
 *
 * Collapsible component used for reporting
 *
 * @return {jsx}
 */
export const ReportCollapsible = ({
  headingItems,
  contentHeading,
  contentText,
  contentMenuOptions,
  componentId = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(false);

  return (
    <Box
      classes={`report-collapsible ${isOpen ? "report-collapsible--open" : ""}`}
      boxShadow={2}
      borderSize="sm"
    >
      <Grid classes="report-collapsible__grid">
        {headingItems.map((item, index) => {
          return (
            <div
              className={`report-collapsible__grid__item report-collapsible__grid__item--${
                headingItems.length === 4
                  ? "sm"
                  : headingItems.length === 2
                  ? index === 1
                    ? "xl"
                    : "md"
                  : index === 1
                  ? "md"
                  : "sm"
              }
              `}
              key={index}
              onClick={() => setIsOpen(!isOpen)}
            >
              {item}
              {((width < 900 && index === 0) ||
                (width >= 900 &&
                  index === headingItems.length - 1 &&
                  headingItems.length === 2)) && (
                <Icon
                  name="arrow-chevron-down"
                  classes="report-collapsible__grid__arrow"
                  color="#20809E"
                />
              )}
            </div>
          );
        })}
        {width >= 900 && headingItems.length === 3 ? (
          <div className="report-collapsible__grid__item report-collapsible__grid__item--xs">
            <Icon
              name="arrow-chevron-down"
              classes="report-collapsible__grid__arrow"
              color="#20809E"
            />
          </div>
        ) : null}
      </Grid>
      {isOpen && (
        <Grid classes="report-collapsible__content-grid">
          <GridItem md={8} lg={12}>
            <div className="report-collapsible__content-heading-container">
              <h4 className="report-collapsible__content-grid__heading">
                {contentHeading}
              </h4>
              {contentMenuOptions && (
                <Icon
                  name="three-dots-vertical"
                  color={"#20809E"}
                  onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
                  classes="report-collapsible__content-heading-container__three-dots"
                />
              )}
            </div>
          </GridItem>
          <GridItem md={8} lg={12}>
            <p className="text">{contentText}</p>
          </GridItem>
        </Grid>
      )}
      {contentMenuOptions && isContentMenuOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsContentMenuOpen(false)}>
          <ContentMenu
            options={contentMenuOptions}
            setIsContentMenuOpen={setIsContentMenuOpen}
            componentId={componentId}
          />
        </OutsideClickHandler>
      )}
    </Box>
  );
};

ReportCollapsible.propTypes = {
  /**
   * Items that will be displayed in the main part of the component
   */
  headingItems: PropTypes.arrayOf(PropTypes.node).isRequired,

  /**
   * The heading of the collapsible part of the component
   */
  contentHeading: PropTypes.string.isRequired,

  /**
   * Content displayed in the collapsible part of the component
   */
  contentText: PropTypes.string.isRequired,
};

const ContentMenu = ({ setIsContentMenuOpen, options, componentId }) => {
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <div
          key={index}
          className={[
            "report-collapsible__content-menu__button",
            option.color &&
              `report-collapsible__content-menu__button--${option.color}`,
          ].join(" ")}
          onClick={() => {
            setIsContentMenuOpen(false);
            option.onClick(componentId);
          }}
        >
          <p className="text">{option.label}</p>
        </div>
      );
    });
  };

  return (
    <Box classes="report-collapsible__content-menu">{renderOptions()}</Box>
  );
};
