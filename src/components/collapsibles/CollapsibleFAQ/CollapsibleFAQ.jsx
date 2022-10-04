import React from "react";
import PropTypes from "prop-types";

import "./collapsiblefaq.scss";
import { Collapsible } from "../Collapsible/Collapsible";

/**
 * CollapsibleFAQ
 *
 * CollapsibleFAQ component
 *
 * @return {jsx}
 */
export const CollapsibleFAQ = ({ question }) => {
  const header = <h4 className="faq-header">{question.heading}</h4>;
  const text = <p className="text">{question.text}</p>;

  const renderAllQuestions = () => {
    question;
  };

  return (
    <Collapsible
      heading={header}
      collapsibleContent={text}
      iconColor={"#20809E"}
      iconSize="md"
    />
  );
};

CollapsibleFAQ.propTypes = {
  // Add propTypes here
};

CollapsibleFAQ.defaultProps = {
  // Add defaultProps here
};
