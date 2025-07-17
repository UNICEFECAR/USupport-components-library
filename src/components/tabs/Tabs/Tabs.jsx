import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Icon } from "../../icons";

import "./tabs.scss";

/**
 * Tabs
 *
 * Tabs component with horizontal scroll
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect, t = () => {} }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleOnSelect = (index) => {
    if (handleSelect) {
      handleSelect(index);
    }
  };

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const tolerance = 1;
      setCanScrollLeft(scrollLeft > tolerance);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
    }
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2.5;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollability();

    const handleResize = () => {
      checkScrollability();
    };

    const handleScroll = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [options]);

  const renderOptions = () => {
    if (!options || !Array.isArray(options)) {
      return null;
    }

    return options.map((option, index) => (
      <div
        className={[
          "tab",
          option.isSelected ? "tab--selected" : "",
          option.isInactive ? "tab--inactive" : "",
        ].join(" ")}
        onClick={option.isInactive ? undefined : () => handleOnSelect(index)}
        key={index}
      >
        <p className="paragraph">{option.label}</p>
      </div>
    ));
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        <div
          className={`tab-arrow tab-arrow--left ${
            !canScrollLeft ? "tab-arrow--disabled" : ""
          }`}
          onClick={() => canScrollLeft && scrollTabs("left")}
        >
          <Icon name="arrow-chevron-back" />
        </div>
        <div className="tabs-container" ref={scrollContainerRef}>
          {renderOptions()}
        </div>
        <div
          className={`tab-arrow tab-arrow--right ${
            !canScrollRight ? "tab-arrow--disabled" : ""
          }`}
          onClick={() => canScrollRight && scrollTabs("right")}
        >
          <Icon name="arrow-chevron-forward" />
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  /**
   * options to be displayed
   * */
  options: PropTypes.arrayOf(PropTypes.object),

  /**
   * handleSelect function to be called when an option is selected
   **/
  handleSelect: PropTypes.func,

  /**
   * translation function
   **/
  t: PropTypes.func,
};

Tabs.defaultProps = {
  options: [],
  t: () => {},
};
