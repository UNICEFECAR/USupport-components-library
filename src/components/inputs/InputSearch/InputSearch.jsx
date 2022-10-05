import React from "react";
import PropTypes from "prop-types";
import { Input } from "../Input/Input";
import { Icon } from "../../icons/Icon/Icon";

import "./inputsearch.scss";

/**
 * InputSearch
 *
 * Input Search component
 *
 * @return {jsx}
 */
export const InputSearch = ({ onChange, ...props }) => {
  const [inputEmpty, setinputEmpty] = React.useState(false);

  const preInput = (
    <div className="pre-input-wrapper">
      <Icon
        id={"search-icon"}
        name={"search"}
        size="md"
        color={inputEmpty ? "#373737" : "7F2EE5"}
      />
    </div>
  );

  function handleInputChange(value) {
    if (value) {
      setinputEmpty(true);
    } else {
      setinputEmpty(false);
    }

    onChange ? onChange(value) : null;
  }

  return (
    <Input
      type={"text"}
      preInput={preInput}
      onChange={(newValue) => handleInputChange(newValue.currentTarget.value)}
      {...props}
    >
      {inputEmpty && (
        <div className="icon-wrapper">
          <Icon
            name={"close-x"}
            size="md"
            color={inputEmpty ? "#373737" : "7F2EE5"}
          />
        </div>
      )}
    </Input>
  );
};

InputSearch.propTypes = {
  /**
   * onChange
   **/
  onChange: PropTypes.func,
};

InputSearch.defaultProps = {
  onChange: null,
};
