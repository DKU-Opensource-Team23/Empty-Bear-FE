import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getMyInfo() {
  return apiRequest(endpoints.users.me);
}

export function updateMyInfo({ nickname, studentNumber, department }) {
  return apiRequest(endpoints.users.me, {
    method: "PATCH",
    body: { nickname, studentNumber, department },
  });
}

export function getMyPreference() {
  return apiRequest(endpoints.users.preferences);
}

export function updateMyPreference({
  preferredBuildingId,
  minAvailableTime,
  needOutlet,
}) {
  return apiRequest(endpoints.users.preferences, {
    method: "PATCH",
    body: { preferredBuildingId, minAvailableTime, needOutlet },
  });
}
