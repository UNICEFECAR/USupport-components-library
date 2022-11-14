import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { providerSvc } from "../services";

/**
 * Reuseable hook to get and transform the provider data in a desired format
 */
export default function useGetProviderData() {
  //   const queryClient = useQueryClient();
  const [providersData, setProvidersData] = useState();
  const fetchProvidersData = async () => {
    const { data } = await providerSvc.getProviderData();

    const formattedData = {
      providerDetailID: data.provider_detail_id || "",
      name: data.name || "",
      patronym: data.patronym || "",
      surname: data.surname || "",
      nickname: data.nickname || "",
      email: data.email || "",
      phonePrefix: data.phone_prefix || "",
      phone: data.phone || "",
      image: data.image || "default",
      specializations: data.specializations || [],
      address: data.address || "",
      education: data.education || [],
      sex: data.sex || "",
      consultationPrice: data.consultation_price || 0,
      description: data.description || "",
      languages: data.languages || [],
      workWith: data.work_with || [],
    };
    return formattedData;
  };

  const providersDataQuery = useQuery(["provider-data"], fetchProvidersData, {
    onSuccess: (data) => {
      const dataCopy = JSON.parse(JSON.stringify(data));
      setProvidersData({ ...dataCopy });
    },
    onError: (err) => console.log(err, "err"),
    notifyOnChangeProps: ["data"],
  });

  return [providersDataQuery, providersData, setProvidersData];
}

export { useGetProviderData };
