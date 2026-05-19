// 노션 API 명세에 적힌 URL을 한곳에 모아둡니다.
// 나중에 실제 fetch 연결을 할 때 화면 코드 대신 이 파일만 우선 확인하면 됩니다.
export const endpoints = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
  },
  users: {
    me: "/api/users/me",
    preferences: "/api/users/me/preferences",
    favorites: "/api/users/me/favorites",
    recentClassrooms: "/api/users/me/recent-classrooms",
  },
  classrooms: {
    list: "/api/classrooms",
    detail: (classroomId) => `/api/classrooms/${classroomId}`,
    schedule: (classroomId) => `/api/classrooms/${classroomId}/schedule`,
    reviews: (classroomId) => `/api/classrooms/${classroomId}/reviews`,
  },
  buildings: {
    list: "/api/buildings",
    floors: (buildingId) => `/api/buildings/${buildingId}/floors`,
    floorPlan: (buildingId, floor) =>
      `/api/buildings/${buildingId}/floors/${floor}/map`,
    floorClassrooms: (buildingId, floor) =>
      `/api/buildings/${buildingId}/floors/${floor}/classrooms`,
  },
  tags: {
    reviews: "/api/tags/reviews",
  },
  recommend: {
    classrooms: "/api/recommend/classrooms",
  },
};
