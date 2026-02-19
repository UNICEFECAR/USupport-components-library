import React, { useContext } from "react";

import { CheckBox } from "../../inputs/CheckBox";
import { ThemeContext } from "../../../utils";

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
  const { theme } = useContext(ThemeContext);

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
          className={[
            "privacy-policy-link",
            theme === "highContrast" && "privacy-policy-link--hc",
          ].join(" ")}
          onClick={() =>
            window
              .open(`${WEBSITE_URL}/privacy-policy`, "_blank", "noreferrer")
              .focus()
          }
        >
          {textTwo}
        </span>{" "}
        {textThree}{" "}
        <span
          className={[
            "privacy-policy-link",
            theme === "highContrast" && "privacy-policy-link--hc",
          ].join(" ")}
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
