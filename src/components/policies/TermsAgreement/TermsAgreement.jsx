import React from "react";
import { CheckBox } from "../../inputs/CheckBox";

import "./terms-agreement.scss";
const WEBSITE_URL = `${import.meta.env.VITE_WEBSITE_URL}`;

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
  Link,
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
        <span
          className="privacy-policy-link"
          onClick={() =>
            window
              .open(`${WEBSITE_URL}/privacy-policy`, "_blank", "noreferrer")
              .focus()
          }
        >
          {textTwo}
        </span>{" "}
        {textThree} <br />
        <span
          className="privacy-policy-link"
          onClick={() =>
            window
              .open(`${WEBSITE_URL}/terms-of-use`, "_blank", "noreferrer")
              .focus()
          }
        >
          {textFour}
        </span>
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
