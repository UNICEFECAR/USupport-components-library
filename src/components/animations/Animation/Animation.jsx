import React from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Local animations
import MascotOrangeWaving from "./assets/MascotOrangeWaving.json";
import MascotBlueWavingHearts from "./assets/MascotBlueWavingHearts.json";
import MascotBlueConfused from "./assets/MascotBlueConfused.json";
import MascotBlueQuestions from "./assets/MascotBlueQuestions.json";
import MascotPurpleStars from "./assets/MascotPurpleStars.json";
import MascotPurpleInformation from "./assets/MascotPurpleInformation.json";
import MascotBlueWavingCutOff from "./assets/MascotBlueWavingCutOff.json";

/**
 * Animation
 *
 * Lottie animation to be used only for .json files
 *
 * @return {jsx}
 */
export const Animation = ({ json, name, classes }) => {
  let jsonToRender = json;

  if (jsonToRender === undefined) {
    switch (name) {
      case "MascotOrangeWaving":
        jsonToRender = MascotOrangeWaving;
        break;
      case "MascotBlueWavingHearts":
        jsonToRender = MascotBlueWavingHearts;
        break;
      case "MascotBlueConfused":
        jsonToRender = MascotBlueConfused;
        break;
      case "MascotBlueQuestions":
        jsonToRender = MascotBlueQuestions;
        break;
      case "MascotPurpleStars":
        jsonToRender = MascotPurpleStars;
        break;
      case "MascotPurpleInformation":
        jsonToRender = MascotPurpleInformation;
        break;
      case "MascotBlueWavingCutOff":
        jsonToRender = MascotBlueWavingCutOff;
        break;
      default:
        jsonToRender = MascotOrangeWaving;
    }
  }

  return (
    <Lottie
      animationData={jsonToRender}
      loop={true}
      className={classNames(classes)}
    />
  );
};

Animation.propTypes = {
  /**
   * Animation name
   * */
  name: PropTypes.oneOf([
    "MascotOrangeWaving",
    "MascotBlueWavingHearts",
    "MascotBlueConfused",
    "MascotBlueQuestions",
    "MascotPurpleStars",
    "MascotPurpleInformation",
    "MascotBlueWavingCutOff",
  ]),

  /**
   * Animation json file
   * */
  json: PropTypes.object,

  /**
   * Additional classes to be added to the animation
   **/
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Animation.defaultProps = {};
