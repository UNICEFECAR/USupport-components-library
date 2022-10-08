import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible/Collapsible";
import { Line } from "../../separators/Line/Line";

import "./collapsiblefaq.scss";

/**
 * CollapsibleFAQ
 *
 * CollapsibleFAQ component
 *
 * @return {jsx}
 */
export const CollapsibleFAQ = ({ questions }) => {
  return questions.map((question, index) => {
    return (
      <React.Fragment key={index}>
        <Collapsible
          heading={<h4 className="faq-header">{question.heading}</h4>}
          content={<p className="text faq-text">{question.text}</p>}
          classes="collapsible-faq"
          iconColor={"#20809E"}
          iconSize="md"
        />
        <Line />
      </React.Fragment>
    );
  });
};

CollapsibleFAQ.propTypes = {
  /**
   * Question object
   * */
  question: PropTypes.object,
};

CollapsibleFAQ.defaultProps = {
  // Add defaultProps here
};
