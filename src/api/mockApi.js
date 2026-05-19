import {
  buildings,
  classrooms,
  favorites,
  mockUser,
  mockUserPreference,
  reviewTags,
  reviews,
  schedules,
} from "../data/mockApiData";

const getBuildingName = (buildingId) =>
  buildings.find((building) => building.buildingId === buildingId)
    ?.buildingName ?? "알 수 없음";

const getReviewTagNames = (tagIds) =>
  tagIds
    .map((tagId) => reviewTags.find((tag) => tag.tagId === tagId)?.displayName)
    .filter(Boolean);

const toClassroomCardDto = (classroom) => ({
  ...classroom,
  buildingName: getBuildingName(classroom.buildingId),
});

export const mockApi = {
  login: ({ loginId }) => ({
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
    user: { ...mockUser, loginId },
  }),
  signup: (payload) => ({
    userId: 99,
    ...payload,
  }),
  getMe: () => mockUser,
  updateMe: (payload) => ({ ...mockUser, ...payload }),
  getPreferences: () => mockUserPreference,
  updatePreferences: (payload) => ({ ...mockUserPreference, ...payload }),
  getRecentClassrooms: () => [],
  getBuildings: () => buildings,
  getClassrooms: () => classrooms.map(toClassroomCardDto),
  getRecommendedClassrooms: ({ minAvailableTime, preferredBuildingId, needOutlet }) =>
    classrooms
      .filter((classroom) => classroom.availableMinutes >= minAvailableTime)
      .filter((classroom) =>
        preferredBuildingId ? classroom.buildingId === preferredBuildingId : true
      )
      .filter((classroom) => (needOutlet ? classroom.hasOutlet : true))
      .sort((a, b) => b.availableMinutes - a.availableMinutes)
      .map(toClassroomCardDto),
  getFloorClassrooms: ({ buildingId, floor }) =>
    classrooms
      .filter(
        (classroom) =>
          classroom.buildingId === buildingId && classroom.floor === floor
      )
      .map(toClassroomCardDto),
  getClassroomDetail: (classroomId) => {
    const classroom = classrooms.find(
      (item) => item.classroomId === classroomId
    );

    return classroom ? toClassroomCardDto(classroom) : null;
  },
  getClassroomSchedule: (classroomId) =>
    schedules.filter((schedule) => schedule.classroomId === classroomId),
  getReviewTags: () => reviewTags,
  getClassroomReviews: (classroomId) =>
    reviews
      .filter((review) => review.classroomId === classroomId)
      .map((review) => ({
        ...review,
        tagNames: getReviewTagNames(review.tagIds),
      })),
  getFavorites: () =>
    favorites
      .filter((favorite) => favorite.userId === mockUser.userId)
      .map((favorite) => {
        const classroom = classrooms.find(
          (item) => item.classroomId === favorite.classroomId
        );

        return classroom ? toClassroomCardDto(classroom) : null;
      })
      .filter(Boolean),
};
