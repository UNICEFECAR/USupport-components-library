import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icons";
import "./tabs.scss";

/**
 * Tabs
 *
 * Pill-style tabs with horizontal scroll when overflowing.
 *
 * @return {jsx}
 */
export const Tabs = ({ options, handleSelect, t = () => {}, classes }) => {
  const IS_RTL = localStorage.getItem("language") === "ar";

  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleOnSelect = (index) => {
    if (handleSelect) handleSelect(index);
  };

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollWidth, clientWidth } = el;
    const tolerance = 1;
    let scrollLeft = el.scrollLeft;

    // Normalize RTL scroll behavior
    if (IS_RTL) {
      const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
      if (isFirefox) {
        // Firefox: 0 at right edge, increases leftward
        scrollLeft = scrollWidth - clientWidth - scrollLeft;
      } else {
        // Chrome / Edge: negative values when scrolling leftward
        scrollLeft = -scrollLeft;
      }
    }

    const hasOverflow = scrollWidth > clientWidth;
    setIsOverflowing(hasOverflow);
    setCanScrollLeft(hasOverflow && scrollLeft > tolerance);
    setCanScrollRight(
      hasOverflow && scrollLeft < scrollWidth - clientWidth - tolerance,
    );
  };

  const scrollTabs = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth / 2.5;
    let newScrollLeft = el.scrollLeft;

    // Flip scroll direction in RTL
    const isLeft = direction === "left";
    const move = isLeft ? -scrollAmount : scrollAmount;

    if (IS_RTL) {
      // In RTL, scrolling visually left means increasing scrollLeft in Chrome,
      // but decreasing in Firefox — so we need to detect and adjust.
      const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
      newScrollLeft += isFirefox ? move : -move;
    } else {
      newScrollLeft += move;
    }

    el.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScrollability();

    const handleResize = () => checkScrollability();
    const handleScroll = () => checkScrollability();

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
  }, [options, IS_RTL]);

  const renderOptions = () => {
    if (!Array.isArray(options)) return null;

    return options.map((option, index) => (
      <button
        type="button"
        role="tab"
        aria-selected={Boolean(option.isSelected)}
        disabled={Boolean(option.isInactive)}
        className={[
          "tab",
          option.isSelected ? "tab--selected" : "",
          option.isInactive ? "tab--inactive" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => handleOnSelect(index)}
        key={option.value ?? index}
      >
        <span className="paragraph">{option.label}</span>
      </button>
    ));
  };

  return (
    <div
      className={`tabs-wrapper ${IS_RTL ? "tabs-wrapper--rtl" : ""} ${classes || ""}`}
    >
      <div className="tabs">
        {isOverflowing && (
          <div
            className={`tab-arrow tab-arrow--left ${
              !canScrollLeft ? "tab-arrow--disabled" : ""
            }`}
            onClick={() => canScrollLeft && scrollTabs("left")}
          >
            <Icon
              name={IS_RTL ? "arrow-chevron-forward" : "arrow-chevron-back"}
            />
          </div>
        )}
        <div
          className="tabs-container"
          ref={scrollContainerRef}
          dir={IS_RTL ? "rtl" : "ltr"}
          role="tablist"
        >
          {renderOptions()}
        </div>
        {isOverflowing && (
          <div
            className={`tab-arrow tab-arrow--right ${
              !canScrollRight ? "tab-arrow--disabled" : ""
            }`}
            onClick={() => canScrollRight && scrollTabs("right")}
          >
            <Icon
              name={IS_RTL ? "arrow-chevron-back" : "arrow-chevron-forward"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  handleSelect: PropTypes.func,
  t: PropTypes.func,
};

Tabs.defaultProps = {
  options: [],
  t: () => {},
};
