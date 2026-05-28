import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getRecommendedClassrooms({
  buildingId,
  minAvailableHour,
  minAvailableMinute,
  needOutlet,
} = {}) {
  return apiRequest(endpoints.recommend.classrooms, {
    query: {
      buildingId,
      minAvailableHour,
      minAvailableMinute,
      needOutlet,
    },
  });
}
