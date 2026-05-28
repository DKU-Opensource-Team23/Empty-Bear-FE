import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getFavorites() {
  return apiRequest(endpoints.users.favorites);
}

export function addFavorite(classroomId) {
  return apiRequest(endpoints.users.favorites, {
    method: "POST",
    body: { classroomId },
  });
}

export function deleteFavorite(classroomId) {
  return apiRequest(`${endpoints.users.favorites}/${classroomId}`, {
    method: "DELETE",
  });
}
