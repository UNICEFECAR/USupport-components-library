import React from "react";
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
        <a className="privacy-policy-link" href="#">
          {textTwo}
        </a>{" "}
        {textThree} <br />
        <a className="privacy-policy-link" href="#">
          {textFour}
        </a>
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
