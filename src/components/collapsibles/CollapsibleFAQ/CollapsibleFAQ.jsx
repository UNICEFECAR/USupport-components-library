import React from "react";
import PropTypes from "prop-types";
import { Collapsible } from "../Collapsible";
import { Line } from "../../separators/Line";

import "./collapsiblefaq.scss";

/**
 * CollapsibleFAQ
 *
 * CollapsibleFAQ component
 *
 * @return {jsx}
 */
export const CollapsibleFAQ = ({ data }) => {
  return data?.map((faq, index) => {
    return (
      <React.Fragment key={index}>
        <Collapsible
          heading={<h4 className="faq-header">{faq.question}</h4>}
          content={<p className="text faq-text">{faq.answer}</p>}
          classes="collapsible-faq"
          iconColor={"#20809e"}
          iconSize="md"
        />
        {index < data.length - 1 && <Line />}
      </React.Fragment>
    );
  });
};

CollapsibleFAQ.propTypes = {
  /**
   * data FAQs array
   * */
  data: PropTypes.array,
};

CollapsibleFAQ.defaultProps = {
  // Add defaultProps here
};
