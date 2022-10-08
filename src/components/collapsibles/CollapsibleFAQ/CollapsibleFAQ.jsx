import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible/Collapsible";

import "./collapsiblefaq.scss";

/**
 * CollapsibleFAQ
 *
 * CollapsibleFAQ component
 *
 * @return {jsx}
 */
export const CollapsibleFAQ = ({ question }) => {
  const header = <h4 className="faq-header">{question.heading}</h4>;
  const text = (
    <p className="text" classes="faq-text">
      {question.text}
    </p>
  );

  return (
    <Collapsible
      heading={header}
      content={text}
      classes="collapsible-faq"
      iconColor={"#20809E"}
      iconSize="md"
    />
  );
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
