import React, { useEffect, useContext, useState } from "react";

import { ButtonOnlyIcon } from "../../buttons";
import { Box } from "../../boxes";
import { Toggle, Slider } from "../../inputs";
import { Icon } from "../../icons";
import { ThemeContext, useWindowDimensions } from "../../../utils";

import "./accessibility-controller.scss";

/**
 * Accessibility Controller Component
 *
 * Manages accessibility features such as font size and high contrast mode.
 *
 * @return {jsx}
 */
export const AccessibilityController = ({ classes, t }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [fontSizeStep, setFontSizeStep] = useState(0);
  const { width } = useWindowDimensions();

  // Base font size is 62.5%
  const baseFontSize = 62.5;
  const stepIncrement = 5; // 5% per step
  const maxSteps = 3; // Maximum 3 steps up or down
  const minSteps = -3;

  // Load saved font size step from localStorage on component mount
  useEffect(() => {
    const savedFontSizeStep = localStorage.getItem(
      "accessibility-font-size-step"
    );
    if (savedFontSizeStep) {
      const parsedStep = parseInt(savedFontSizeStep, 10);
      // Ensure the step is within valid range
      const validStep = Math.max(minSteps, Math.min(maxSteps, parsedStep));
      setFontSizeStep(validStep);
      applyFontSize(validStep);
    }
  }, []);

  // Apply font size to document root based on step
  const applyFontSize = (step) => {
    const htmlElement = document.documentElement;
    // Calculate font size: base + (step * increment)
    const newFontSize = baseFontSize + step * stepIncrement;
    htmlElement.style.fontSize = `${newFontSize}%`;
  };

  // Get current font size percentage for display
  const getCurrentFontSize = () => {
    return baseFontSize + fontSizeStep * stepIncrement;
  };

  // Increase font size by one step (5%)
  const increaseFontSize = () => {
    if (fontSizeStep < maxSteps) {
      const newStep = fontSizeStep + 1;
      setFontSizeStep(newStep);
      applyFontSize(newStep);
      localStorage.setItem("accessibility-font-size-step", newStep.toString());
    }
  };

  // Decrease font size by one step (5%)
  const decreaseFontSize = () => {
    if (fontSizeStep > minSteps) {
      const newStep = fontSizeStep - 1;
      setFontSizeStep(newStep);
      applyFontSize(newStep);
      localStorage.setItem("accessibility-font-size-step", newStep.toString());
    }
  };

  // Toggle high contrast theme
  const toggleHighContrast = () => {
    const newTheme = theme === "highContrast" ? "light" : "highContrast";
    setTheme(newTheme);
  };

  // Reset font size to default (step 0)
  const resetFontSize = () => {
    setFontSizeStep(0);
    applyFontSize(0);
    localStorage.removeItem("accessibility-font-size-step");
  };

  const currentFontSize = getCurrentFontSize();
  const canIncrease = fontSizeStep < maxSteps;
  const canDecrease = fontSizeStep > minSteps;

  const isDesktop = width >= 1050;

  // Mobile: Toggle first, Slider below
  if (!isDesktop) {
    return (
      <Box classes={["accessibility-controller", classes]}>
        <div className="accessibility-controller__toggle-container">
          <Icon
            name="accessibility"
            size="md"
            color={theme === "highContrast" ? "#ffff00" : "#20809e"}
          />
          <p>{t("high_contrast")}</p>
          <Toggle
            isToggled={theme === "highContrast"}
            shouldChangeState
            setParentState={toggleHighContrast}
            size="sm"
            classes="accessibility-controller__toggle-container__toggle"
          />
        </div>
        <div className="accessibility-controller__slider-container">
          <Slider
            min={minSteps}
            max={maxSteps}
            value={fontSizeStep}
            leftContent={
              <Icon
                name="zoom-out"
                size="md"
                color={"#20809e"}
                onClick={decreaseFontSize}
              />
            }
            rightContent={
              <Icon
                name="zoom"
                size="md"
                color={"#20809e"}
                onClick={increaseFontSize}
              />
            }
            renderValue={(v) => `${v}`}
            onChange={(val) => {
              const clamped = Math.max(minSteps, Math.min(maxSteps, val));
              setFontSizeStep(clamped);
              applyFontSize(clamped);
              localStorage.setItem(
                "accessibility-font-size-step",
                clamped.toString()
              );
            }}
          />
        </div>
      </Box>
    );
  }

  return (
    <Box classes={["accessibility-controller", classes]} liquidGlass={isDesktop}>
      <div className="accessibility-controller__toggle-container">
        <Toggle
          isToggled={theme === "highContrast"}
          shouldChangeState
          setParentState={toggleHighContrast}
        />
        <p>{t("high_contrast")}</p>
      </div>
      <div className="accessibility-controller__zoom-container">
        <ButtonOnlyIcon
          iconName="zoom-out"
          onClick={decreaseFontSize}
          disabled={!canDecrease}
          title={`Decrease font size (Current: ${currentFontSize}%) ${
            !canDecrease ? "- Minimum reached" : ""
          }`}
          aria-label={`Decrease font size. Current size: ${currentFontSize}%. ${
            !canDecrease ? "Minimum size reached." : ""
          }`}
        />
        <ButtonOnlyIcon
          iconName="accessibility"
          onClick={toggleHighContrast}
          aria-label={`Toggle high contrast mode. Currently ${
            theme === "highContrast" ? "enabled" : "disabled"
          }`}
          classes="accessibility-controller__zoom-container__high-contrast"
        />
        <ButtonOnlyIcon
          iconName="zoom"
          onClick={increaseFontSize}
          disabled={!canIncrease}
          title={`Increase font size (Current: ${currentFontSize}%) ${
            !canIncrease ? "- Maximum reached" : ""
          }`}
          aria-label={`Increase font size. Current size: ${currentFontSize}%. ${
            !canIncrease ? "Maximum size reached." : ""
          }`}
        />
      </div>
    </Box>
  );
};
