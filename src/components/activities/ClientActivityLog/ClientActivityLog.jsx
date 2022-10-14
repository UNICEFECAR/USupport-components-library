import React from "react";
import PropTypes from "prop-types";

import "./client-activity-log.scss";
import { Box } from "../../boxes/Box/Box";
import { ClientActivity } from "../ClientActivity/ClientActivity";

/**
 * ClientActivityLog
 *
 * ClientActivityLog component
 *
 * @return {jsx}
 */
export const ClientActivityLog = ({ activities }) => {
  const renderAllActivities = () => {
    return (
      <div className="client-activity-log__activities">
        {activities?.map((activity, index) => {
          return (
            <ClientActivity
              text={activity.text}
              date={activity.date}
              key={index}
              classes="client-activity-log__activities__activity"
            />
          );
        })}
      </div>
    );
  };

  const renderNoActivities = () => {
    return (
      <div className="client-activity-log__no-activities">
        <p className="text">No activities yet</p>
      </div>
    );
  };

  return (
    <Box classes="client-activity-log">
      {activities?.length > 0 ? renderAllActivities() : renderNoActivities()}
    </Box>
  );
};

ClientActivityLog.propTypes = {
  /**
   * Array of activities
   * @type {array}
   */
  activities: PropTypes.array,
};

ClientActivityLog.defaultProps = {
  activities: [],
};
