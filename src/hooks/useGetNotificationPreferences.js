import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { userSvc } from "../services";

/**
 * Reuseable hook to get and transform the client data in a desired format
 */
export default function useGetNotificationPreferences() {
  const queryClient = useQueryClient();
  const [notificationPreferences, setNotificationPreferences] = useState();
  const fetchNotificationsData = async () => {
    const res = await userSvc.getNotificationPreferences();
    return res.data;
  };

  const notificationsPreferencesQuery = useQuery(
    ["notification-preferences"],
    fetchNotificationsData,
    {
      onSuccess: (data) => {
        const dataCopy = JSON.parse(JSON.stringify(data));
        setNotificationPreferences({ ...dataCopy });
      },
      onError: (err) => console.log(err, "err"),
      notifyOnChangeProps: ["data"],
    }
  );

  const update = (data) => {
    // queryClient.setQueryData(["notification-preferences"], data);
  };

  //   useEffect(() => {
  //     const queryData = notificationsPreferencesQuery.data;
  //     const stateData = notificationPreferences;
  //     console.log("data changed");
  //     if (queryData && stateData) {
  //       console.log("difference");
  //       if (JSON.stringify(queryData) !== JSON.stringify(stateData)) {
  //         setNotificationPreferences(queryData);
  //       }
  //     }
  //   }, [notificationsPreferencesQuery.data]);

  return [notificationsPreferencesQuery, update];
}

export { useGetNotificationPreferences };
