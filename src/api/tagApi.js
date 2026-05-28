import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getReviewTags() {
  return apiRequest(endpoints.tags.reviews);
}
