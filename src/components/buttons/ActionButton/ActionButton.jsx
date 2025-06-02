import PropTypes from "prop-types";
import classNames from "classnames";

import { Loading } from "../../loaders";
import { Icon } from "../../icons";

import "./action-button.scss";

/**
 * ActionButton
 *
 * ActionButton component
 *
 * @return {jsx}
 */
export const ActionButton = ({ handleClick, isLoading, iconName, classes }) => {
  return (
    <div
      onClick={handleClick}
      className={["action-button", classNames(classes)].join(" ")}
    >
      {isLoading ? (
        <Loading padding="0px" size="sm" />
      ) : (
        <Icon color={"#66768d"} name={iconName} size="sm" />
      )}
    </div>
  );
};

ActionButton.propTypes = {
  /**
   * Function to handle click event
   */
  handleClick: PropTypes.func.isRequired,

  /**
   * Boolean to indicate if the button is loading
   */
  isLoading: PropTypes.bool,

  /**
   * Name of the icon to display
   */
  iconName: PropTypes.string.isRequired,

  /**
   * Theme context value
   */
  theme: PropTypes.string,

  /**
   * Additional classes for styling
   */
  classes: PropTypes.string,
};
