export const mockUser = {
  userId: 1,
  loginId: "student01",
  nickname: "학생",
  studentNumber: "32233054",
  department: "소프트웨어학과",
  profileImageUrl: "",
  createdAt: "2026-05-18T09:00:00",
};

export const mockUserPreference = {
  userPreferenceId: 1,
  userId: 1,
  preferredBuildingId: 1,
  minAvailableTime: 30,
  needOutlet: false,
  studyType: "LONG",
  updatedAt: "2026-05-18T09:00:00",
};

export const buildings = [
  {
    buildingId: 1,
    buildingName: "소웨관",
    campus: "죽전",
    latitude: 37.3228549,
    longitude: 127.1276063,
    floorPlans: {
      1: "/images/floorplans/software/1f.png",
      2: "/images/floorplans/software/2f.png",
      3: "/images/floorplans/software/3f.png",
      4: "/images/floorplans/software/4f.png",
      5: "/images/floorplans/software/5f.png",
    }
  },
  {
    buildingId: 2,
    buildingName: "제1공학관",
    campus: "죽전",
    latitude: 37.3209511,
    longitude: 127.1258600,
    floorPlans: {
      1: "/images/floorplans/engineering1/1f.png",
      2: "/images/floorplans/engineering1/2f.png",
      3: "/images/floorplans/engineering1/3f.png",
      4: "/images/floorplans/engineering1/4f.png",
      5: "/images/floorplans/engineering1/5f.png",
    }
  },
];

export const floorPlans = [
  {
    floorPlanId: 1,
    buildingId: 1,
    floor: 3,
    imageUrl: "",
    createdAt: "2026-05-18T09:00:00",
  },
];

export const reviewTags = [
  { tagId: 1, code: "QUIET", displayName: "조용해요" },
  { tagId: 2, code: "NOISY", displayName: "시끄러워요" },
  { tagId: 3, code: "OUTLET_ENOUGH", displayName: "콘센트 충분해요" },
  { tagId: 4, code: "OUTLET_LACK", displayName: "콘센트 부족해요" },
];

export const classrooms = [
  {
    classroomId: 1,
    roomName: "301",
    buildingId: 1,
    floorPlanId: 1,
    floor: 3,
    hasOutlet: true,
    description: "조용하게 공부하기 좋은 강의실",
    mapX: 18.42,
    mapY: 24.1,
    availableMinutes: 80,
    nextClassTime: "16:00",
    status: "available",
  },
  {
    classroomId: 2,
    roomName: "305",
    buildingId: 1,
    floorPlanId: 1,
    floor: 3,
    hasOutlet: false,
    description: "짧게 공부하기 좋은 강의실",
    mapX: 35.2,
    mapY: 24.1,
    availableMinutes: 40,
    nextClassTime: "15:20",
    status: "soon",
  },
  {
    classroomId: 3,
    roomName: "201",
    buildingId: 2,
    floorPlanId: null,
    floor: 2,
    hasOutlet: true,
    description: "오래 머물기 좋은 강의실",
    mapX: null,
    mapY: null,
    availableMinutes: 120,
    nextClassTime: "17:00",
    status: "available",
  },
  {
    classroomId: 4,
    roomName: "402",
    buildingId: 2,
    floorPlanId: null,
    floor: 4,
    hasOutlet: true,
    description: "현재 수업 중인 강의실",
    mapX: null,
    mapY: null,
    availableMinutes: 0,
    nextClassTime: "현재 수업 중",
    status: "busy",
  },
];

export const schedules = [
  {
    scheduleId: 1,
    classroomId: 1,
    dayOfWeek: "MONDAY",
    startTime: "16:00",
    endTime: "17:30",
    subjectName: "오픈소스SW기초",
  },
];

export const reviews = [
  {
    reviewId: 1,
    userId: 2,
    classroomId: 1,
    tagIds: [1, 3],
    createdAt: "2026-05-18T10:00:00",
    updatedAt: "2026-05-18T10:00:00",
  },
  {
    reviewId: 2,
    userId: 3,
    classroomId: 1,
    tagIds: [1],
    createdAt: "2026-05-18T11:00:00",
    updatedAt: "2026-05-18T11:00:00",
  },
  {
    reviewId: 3,
    userId: 4,
    classroomId: 2,
    tagIds: [2, 4],
    createdAt: "2026-05-18T12:00:00",
    updatedAt: "2026-05-18T12:00:00",
  },
];

export const favorites = [
  {
    favoriteId: 1,
    userId: 1,
    classroomId: 1,
    createdAt: "2026-05-18T09:30:00",
  },
];
