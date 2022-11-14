import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../../inputs/CheckBox/CheckBox";
import { Line } from "../../separators/Line/Line";

import "./faq-row.scss";

/**
 * FAQRow
 *
 * FAQRow component
 *
 * @return {jsx}
 */
export const FAQRow = ({ selected, setSelected, question, answer }) => {
  return (
    <>
      <div className="faq-row">
        <CheckBox isChecked={selected} setIsChecked={setSelected} />
        <div className="faq-row__text-container">
          <h4>{question}</h4>
          <p className="text">{answer}</p>
        </div>
      </div>
      <Line />
    </>
  );
};

FAQRow.propTypes = {
  /**
   * selected
   * @type {boolean}
   * @default false
   */
  selected: PropTypes.bool,

  /**
   * Function to set selected
   * @type {function}
   * @default () => {}
   */
  setSelected: PropTypes.func,

  /**
   * Question to be displayed
   * */
  question: PropTypes.string,

  /**
   * Answer to be displayed
   * */
  answer: PropTypes.string,
};

FAQRow.defaultProps = {
  selected: false,
  setSelected: () => {},
};
