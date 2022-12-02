import React from "react";
import { Link } from "react-router-dom";
import { CheckBox } from "../../inputs/CheckBox";
import PropTypes from "prop-types";

import "./terms-agreement.scss";

/**
 * TermsAgreement
 *
 * Terms and Privacy policy agreemet component
 *
 * @return {jsx}
 */
export const TermsAgreement = ({
  isChecked,
  setIsChecked,
  textOne,
  textTwo,
  textThree,
  textFour,
}) => {
  return (
    <div className="terms-agreement">
      <CheckBox
        isChecked={isChecked}
        setIsChecked={(value) => {
          setIsChecked(value);
        }}
      />
      <p className="text">
        {textOne}{" "}
        <Link className="privacy-policy-link" to="/privacy-policy">
          {textTwo}
        </Link>{" "}
        {textThree} <br />
        <Link className="privacy-policy-link" to="/terms-of-use">
          {textFour}
        </Link>
      </p>
    </div>
  );
};

TermsAgreement.propTypes = {
  // Add propTypes here
};

TermsAgreement.defaultProps = {
  // Add defaultProps here
};
