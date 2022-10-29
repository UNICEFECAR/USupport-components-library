import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function useExample() {
  const [exampleData, setExampleData] = useState();

  // Fetch / Query function calling a service
  const fetchDataFn = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    // Manipulate the data received from the service
    const jsonData = await response.json();
    return jsonData;
  };

  // Use the useQuery hook to fetch the data
  const { data, isLoading, isError } = useQuery("exampleData", fetchDataFn, {
    refetchOnWindowFocus: false,
    onSuccess: (successData) => setExampleData([...successData]),
  });

  // Return the data and loading state
  return { exampleData, setExampleData, data, isLoading, isError };
}

export { useExample };
