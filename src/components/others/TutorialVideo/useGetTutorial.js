import { useQuery } from "@tanstack/react-query";
import cmsSvc from "../../../services/cms";

// Each language is independent: never substitute a tutorial in another locale.
export const useGetTutorial = (key, language, platform = "client") =>
  useQuery({
    queryKey: ["tutorial", platform, key, language],
    queryFn: () => cmsSvc.getTutorial(key, language, platform),
    enabled: Boolean(key && language && platform),
    retry: 1,
  });
