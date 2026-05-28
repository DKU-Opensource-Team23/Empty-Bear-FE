import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getClassrooms({
  buildingId,
  floorValue,
  hasOutlet,
  availabilityStatus,
  minAvailableTime,
} = {}) {
  return apiRequest(endpoints.classrooms.list, {
    query: {
      buildingId,
      floorValue,
      hasOutlet,
      availabilityStatus,
      minAvailableTime,
    },
  });
}

export function getClassroomDetail(classroomId) {
  return apiRequest(endpoints.classrooms.detail(classroomId));
}

export function getClassroomSchedule(classroomId) {
  return apiRequest(endpoints.classrooms.schedule(classroomId));
}

export function getClassroomReviews(classroomId, { limit } = {}) {
  return apiRequest(endpoints.classrooms.reviews(classroomId), {
    query: { limit },
  });
}

export function createClassroomReview(classroomId, { tagIds }) {
  return apiRequest(endpoints.classrooms.reviews(classroomId), {
    method: "POST",
    body: { tagIds },
  });
}

export function deleteClassroomReview(classroomId, reviewId) {
  return apiRequest(endpoints.classrooms.review(classroomId, reviewId), {
    method: "DELETE",
  });
}
