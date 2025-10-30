import { v4 } from "uuid";
import { useAddSmokeData } from "../../query/smoke-data/useQuerySmokeData";
import type { SmokeData } from "../../schema/SmokeData.schema";

export const useTrackSmoke = () => {
  const { mutate: addSmokeData } = useAddSmokeData();
  const trackSmoke = () => {
    const newSmokeData: SmokeData = {
      id: v4(),
      timestamp: new Date().toISOString(),
    };
    addSmokeData(newSmokeData);
  };

  return { trackSmoke };
};
