import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { providerSvc } from "../services";

const placeholderData = [];
for (let i = 0; i < 10; i++) {
  placeholderData.push({
    id: i,
    name: "John ",
    patronym: i < 5 ? "Patronym" : "",
    surname: "Doe " + i,
    image: "default",
    phone: "+359 888 888 888",
    education: "Some text describing the providers education",
    sex: i % 2 === 0 ? "male" : "female",
    price: 10 * (i + 1),
    languages: ["en", "bg"],
    types: [
      "psychologist",
      "psychotherapist",
      i % 2 === 0 ? "coach" : null,
    ].filter((x) => x !== null),
    earliestFreeSpot: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius euismod.",
    worksWith: ["children", "male", i % 2 === 0 ? "female" : ""],
  });
}

/**
 * Reuseable hook to get and transform the provider data in a desired format
 */
export default function useGetProviderData() {
  //   const queryClient = useQueryClient();
  const [providersData, setProvidersData] = useState();
  const fetchProvidersData = async () => {
    const { data } = await providerSvc.getProviderData();
    const formattedData = {
      providerDetailID: data.provider_detail_id,
      name: data.name,
      patronym: data.patronym,
      surname: data.surname,
      nickname: data.nickname,
      email: data.email,
      phonePrefix: data.phone_prefix,
      phone: data.phone,
      image: data.image,
      types: data.types,
      address: data.address,
      education: data.education,
      sex: data.sex,
      consultationPrice: data.consultation_price,
      description: data.description,
      languages: data.languages,
      workWith: data.work_with,
    };
    return formattedData;
  };

  const providersDataQuery = useQuery(["client-data"], fetchProvidersData, {
    onSuccess: (data) => {
      const dataCopy = JSON.parse(JSON.stringify(data));
      setProvidersData([...dataCopy]);
    },
    onError: (err) => console.log(err, "err"),
    notifyOnChangeProps: ["data"],
  });

  return [providersDataQuery, providersData, setProvidersData];
}

export { useGetProviderData };
