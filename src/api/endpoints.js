// Backend API endpoint paths.
// Keep this file in sync with the Spring Boot controller mappings.
export const endpoints = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    reissue: "/api/auth/reissue",
    logout: "/api/auth/logout",
  },
  users: {
    me: "/api/users/me",
    preferences: "/api/users/me/preferences",
    favorites: "/api/users/me/favorites",
  },
  classrooms: {
    list: "/api/classrooms",
    detail: (classroomId) => `/api/classrooms/${classroomId}`,
    schedule: (classroomId) => `/api/classrooms/${classroomId}/schedule`,
    reviews: (classroomId) => `/api/classrooms/${classroomId}/reviews`,
    review: (classroomId, reviewId) =>
      `/api/classrooms/${classroomId}/reviews/${reviewId}`,
  },
  buildings: {
    list: "/api/buildings",
    floors: (buildingId) => `/api/buildings/${buildingId}/floors`,
    floorPlan: (buildingId, floorValue) =>
      `/api/buildings/${buildingId}/floors/${floorValue}/floor-plan`,
    floorClassrooms: (buildingId, floorValue) =>
      `/api/buildings/${buildingId}/floors/${floorValue}/classrooms/status`,
  },
  tags: {
    reviews: "/api/tags/reviews",
  },
  recommend: {
    classrooms: "/api/recommend/classrooms",
  },
};
