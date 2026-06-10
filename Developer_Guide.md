# :wrench: 비었곰 개발자 가이드
### 1. 프로젝트 구조
<details>
<summary><b>Empty-Bear-FE(Frontend) 구조 보기</b></summary>

```text
    ├── public
    │   └── images
    │       └── floorplans
    │           └── software
    │               ├── 1f.svg
    │               ├── 2f.svg
    │               ├── 3f.svg
    │               ├── 4f.svg
    │               └── 5f.svg
    ├── src
    │   ├── api
    │   │   ├── authApi.js
    │   │   ├── buildingApi.js
    │   │   ├── classroomApi.js
    │   │   ├── client.js
    │   │   ├── endpoints.js
    │   │   ├── favoriteApi.js
    │   │   ├── recommendApi.js
    │   │   ├── tagApi.js
    │   │   └── userApi.js
    │   ├── components
    │   │   ├── BottomNav.jsx
    │   │   ├── ClassroomCard.jsx
    │   │   ├── FloorPlan.jsx
    │   │   ├── MessageModal.jsx
    │   │   ├── ReviewWriteModal.jsx
    │   │   └── ToastProvider.jsx
    │   ├── image
    │   │   └── 단곰.png
    │   ├── pages
    │   │   ├── ClassroomDetailPage.jsx
    │   │   ├── FavoritesPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── MapPage.jsx
    │   │   ├── PreferencePage.jsx
    │   │   ├── RecommendPage.jsx
    │   │   ├── ReviewPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── styles
    │   │   ├── auth.css
    │   │   ├── bottomNav.css
    │   │   ├── classroom.css
    │   │   ├── common.css
    │   │   ├── home.css
    │   │   ├── index.css
    │   │   ├── map.css
    │   │   ├── preference.css
    │   │   ├── recommend.css
    │   │   ├── review.css
    │   │   ├── timetable.css
    │   │   └── toast.css
    │   ├── utils
    │   │   ├── reviewSummary.js
    │   │   ├── timeFormat.js
    │   │   └── useClassroomReviews.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── Developer_Guide.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── User_Guide.md
    └── vite.config.js
```
</details>


<details>
<summary><b>Empty-Bear-BE(Backend) 구조 보기</b></summary>
    
```text
    ├── .gradle
    │   ├── 8.14.4
    │   │   ├── checksums
    │   │   │   └── checksums.lock
    │   │   ├── executionHistory
    │   │   │   ├── executionHistory.bin
    │   │   │   └── executionHistory.lock
    │   │   ├── expanded
    │   │   ├── fileChanges
    │   │   │   └── last-build.bin
    │   │   ├── fileHashes
    │   │   │   ├── fileHashes.bin
    │   │   │   ├── fileHashes.lock
    │   │   │   └── resourceHashesCache.bin
    │   │   ├── vcsMetadata
    │   │   └── gc.properties
    │   ├── buildOutputCleanup
    │   │   ├── buildOutputCleanup.lock
    │   │   ├── cache.properties
    │   │   └── outputFiles.bin
    │   ├── vcs-1
    │   │   └── gc.properties
    │   └── file-system.probe
    ├── build
    │   ├── classes/ java/main/com/dku/emptybear
    │   │   ├── common
    │   │   │   ├── config
    │   │   │   │   ├── SecurityConfig.class
    │   │   │   │   └── SwaggerConfig.class
    │   │   │   └── error
    │   │   │       ├── ErrorResponse.class
    │   │   │       ├── ErrorResponse$ErrorResponseBuilder.class
    │   │   │       ├── GlobalExceptionHandler.class
    │   │   │       └── JwtAuthenticationEntryPoint.class
    │   │   ├── domain
    │   │   │   ├── auth
    │   │   │   │   ├── controller
    │   │   │   │   │   └── AuthController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   ├── LoginRequestDto.class
    │   │   │   │   │   │   ├── LogoutRequestDto.class
    │   │   │   │   │   │   ├── ReissueRequestDto.class
    │   │   │   │   │   │   └── SignupRequestDto.class
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── AuthMessageResponseDto.class
    │   │   │   │   │       ├── AuthMessageResponseDto$AuthMessageResponseDtoBuilder.class
    │   │   │   │   │       ├── LoginResponseDto.class
    │   │   │   │   │       ├── LoginResponseDto$LoginResponseDtoBuilder.class
    │   │   │   │   │       ├── LoginResponseDto$UserInfoDto.class
    │   │   │   │   │       ├── LoginResponseDto$UserInfoDto$UserInfoDtoBuilder.class
    │   │   │   │   │       ├── ReissueResponseDto.class
    │   │   │   │   │       ├── ReissueResponseDto$ReissueResponseDtoBuilder.class
    │   │   │   │   │       ├── SignupResponseDto.class
    │   │   │   │   │       ├── SignupResponseDto$SignupResponseDtoBuilder.class
    │   │   │   │   │       ├── SignupResponseDto$UserInfoDto.class
    │   │   │   │   │       └── SignupResponseDto$UserInfoDto$UserInfoDtoBuilder.class
    │   │   │   │   ├── jwt
    │   │   │   │   │   ├── JwtAuthenticationFilter.class
    │   │   │   │   │   └── JwtTokenProvider.class
    │   │   │   │   └── service
    │   │   │   │       └── AuthService.class
    │   │   │   ├── building
    │   │   │   │   ├── controller
    │   │   │   │   │   └── BuildingController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── BuildingListResponseDto.class
    │   │   │   │   │       ├── BuildingListResponseDto$BuildingInfoDto.class
    │   │   │   │   │       ├── BuildingListResponseDto$BuildingInfoDto$BuildingInfoDtoBuilder.class
    │   │   │   │   │       ├── BuildingListResponseDto$BuildingListResponseDtoBuilder.class
    │   │   │   │   │       ├── FloorClassroomStatusResponseDto.class
    │   │   │   │   │       ├── FloorClassroomStatusResponseDto$ClassroomStatusDto.class
    │   │   │   │   │       ├── FloorClassroomStatusResponseDto$ClassroomStatusDto$ClassroomStatusDtoBuilder.class
    │   │   │   │   │       ├── FloorClassroomStatusResponseDto$FloorClassroomStatusResponseDtoBuilder.class
    │   │   │   │   │       ├── FloorListResponseDto.class
    │   │   │   │   │       ├── FloorListResponseDto$FloorInfoDto.class
    │   │   │   │   │       ├── FloorListResponseDto$FloorInfoDto$FloorInfoDtoBuilder.class
    │   │   │   │   │       ├── FloorListResponseDto$FloorListResponseDtoBuilder.class
    │   │   │   │   │       ├── FloorPlanResponseDto.class
    │   │   │   │   │       ├── FloorPlanResponseDto$FloorPlanInfoDto.class
    │   │   │   │   │       ├── FloorPlanResponseDto$FloorPlanInfoDto$FloorPlanInfoDtoBuilder.class
    │   │   │   │   │       └── FloorPlanResponseDto$FloorPlanResponseDtoBuilder.class
    │   │   │   │   ├── entity
    │   │   │   │   │   ├── Building.class
    │   │   │   │   │   └── FloorPlan.class
    │   │   │   │   ├── repository
    │   │   │   │   │   ├── BuildingRepository.class
    │   │   │   │   │   └── FloorPlanRepository.class
    │   │   │   │   └── service
    │   │   │   │       ├── BuildingService.class
    │   │   │   │       └── BuildingService$ClassroomAvailability.class
    │   │   │   ├── classroom
    │   │   │   │   ├── controller
    │   │   │   │   │   └── ClassroomController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── CreateReviewRequestDto.class
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── ClassroomDetailResponseDto.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$BuildingInfoDto.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$BuildingInfoDto$BuildingInfoDtoBuilder.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$ClassroomDetailDto.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$ClassroomDetailDto$ClassroomDetailDtoBuilder.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$ClassroomDetailResponseDtoBuilder.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$ReviewSummaryDto.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$ReviewSummaryDto$ReviewSummaryDtoBuilder.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$TagSummaryDto.class
    │   │   │   │   │       ├── ClassroomDetailResponseDto$TagSummaryDto$TagSummaryDtoBuilder.class
    │   │   │   │   │       ├── ClassroomOverviewListResponseDto.class
    │   │   │   │   │       ├── ClassroomOverviewListResponseDto$ClassroomOverviewDto.class
    │   │   │   │   │       ├── ClassroomOverviewListResponseDto$ClassroomOverviewDto$ClassroomOverviewDtoBuilder.class
    │   │   │   │   │       ├── ClassroomOverviewListResponseDto$ClassroomOverviewListResponseDtoBuilder.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ClassroomReviewListResponseDtoBuilder.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewInfoDto.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewInfoDto$ReviewInfoDtoBuilder.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewTagDto.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewTagDto$ReviewTagDtoBuilder.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewUserDto.class
    │   │   │   │   │       ├── ClassroomReviewListResponseDto$ReviewUserDto$ReviewUserDtoBuilder.class
    │   │   │   │   │       ├── ClassroomWeeklyScheduleResponseDto.class
    │   │   │   │   │       ├── ClassroomWeeklyScheduleResponseDto$ClassroomWeeklyScheduleResponseDtoBuilder.class
    │   │   │   │   │       ├── ClassroomWeeklyScheduleResponseDto$ScheduleInfoDto.class
    │   │   │   │   │       ├── ClassroomWeeklyScheduleResponseDto$ScheduleInfoDto$ScheduleInfoDtoBuilder.class
    │   │   │   │   │       ├── CreateReviewResponseDto.class
    │   │   │   │   │       ├── CreateReviewResponseDto$CreateReviewResponseDtoBuilder.class
    │   │   │   │   │       ├── DeleteReviewResponseDto.class
    │   │   │   │   │       ├── DeleteReviewResponseDto$DeleteReviewResponseDtoBuilder.class
    │   │   │   │   │       ├── RecentViewedClassroomListResponseDto.class
    │   │   │   │   │       ├── RecentViewedClassroomListResponseDto$RecentViewedClassroomDto.class
    │   │   │   │   │       ├── RecentViewedClassroomListResponseDto$RecentViewedClassroomDto$RecentViewedClassroomDtoBuilder.class
    │   │   │   │   │       └── RecentViewedClassroomListResponseDto$RecentViewedClassroomListResponseDtoBuilder.class
    │   │   │   │   ├── entity
    │   │   │   │   │   ├── Classroom.class
    │   │   │   │   │   ├── ClassroomViewHistory.class
    │   │   │   │   │   ├── Review.class
    │   │   │   │   │   ├── ReviewTag.class
    │   │   │   │   │   ├── Schedule.class
    │   │   │   │   │   └── Schedule$ScheduleBuilder.class
    │   │   │   │   ├── repository
    │   │   │   │   │   ├── ClassroomRepository.class
    │   │   │   │   │   ├── ClassroomViewHistoryRepository.class
    │   │   │   │   │   ├── ReviewRepository.class
    │   │   │   │   │   ├── ReviewTagRepository.class
    │   │   │   │   │   ├── ReviewTagRepository$TagCountProjection.class
    │   │   │   │   │   └── ScheduleRepository.class
    │   │   │   │   └── service
    │   │   │   │       ├── ClassroomAvailabilityService.class
    │   │   │   │       ├── ClassroomAvailabilityService$ClassroomAvailability.class
    │   │   │   │       └── ClassroomService.class
    │   │   │   ├── favorite
    │   │   │   │   ├── controller
    │   │   │   │   │   └── FavoriteController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── AddFavoriteRequestDto.class
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── FavoriteClassroomListResponseDto.class
    │   │   │   │   │       ├── FavoriteClassroomListResponseDto$FavoriteClassroomDto.class
    │   │   │   │   │       ├── FavoriteClassroomListResponseDto$FavoriteClassroomDto$FavoriteClassroomDtoBuilder.class
    │   │   │   │   │       ├── FavoriteClassroomListResponseDto$FavoriteClassroomListResponseDtoBuilder.class
    │   │   │   │   │       ├── FavoriteStatusResponseDto.class
    │   │   │   │   │       └── FavoriteStatusResponseDto$FavoriteStatusResponseDtoBuilder.class
    │   │   │   │   ├── entity
    │   │   │   │   │   └── Favorite.class
    │   │   │   │   ├── repository
    │   │   │   │   │   └── FavoriteRepository.class
    │   │   │   │   └── service
    │   │   │   │       └── FavoriteService.class
    │   │   │   ├── recommend
    │   │   │   │   ├── controller
    │   │   │   │   │   └── RecommendController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── RecommendRequestDto.class
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── RecommendClassroomResponseDto.class
    │   │   │   │   │       ├── RecommendClassroomResponseDto$ClassroomDto.class
    │   │   │   │   │       ├── RecommendClassroomResponseDto$ClassroomDto$ClassroomDtoBuilder.class
    │   │   │   │   │       └── RecommendClassroomResponseDto$RecommendClassroomResponseDtoBuilder.class
    │   │   │   │   └── service
    │   │   │   │       ├── AvailabilityService.class
    │   │   │   │       ├── AvailabilityService$AvailabilityResult.class
    │   │   │   │       ├── RecommendService.class
    │   │   │   │       ├── RecommendService$1.class
    │   │   │   │       ├── RecommendService$RecommendCandidate.class
    │   │   │   │       └── RecommendService$RecommendCondition.class
    │   │   │   ├── tag
    │   │   │   │   ├── controller
    │   │   │   │   │   └── TagController.class
    │   │   │   │   ├── dto
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── ReviewTagListResponseDto.class
    │   │   │   │   │       ├── ReviewTagListResponseDto$ReviewTagInfoDto.class
    │   │   │   │   │       ├── ReviewTagListResponseDto$ReviewTagInfoDto$ReviewTagInfoDtoBuilder.class
    │   │   │   │   │       └── ReviewTagListResponseDto$ReviewTagListResponseDtoBuilder.class
    │   │   │   │   ├── entity
    │   │   │   │   │   └── Tag.class
    │   │   │   │   ├── repository
    │   │   │   │   │   └── TagRepository.class
    │   │   │   │   └── service
    │   │   │   │       └── TagService.class
    │   │   │   └── user
    │   │   │       ├── controller
    │   │   │       │   └── UserController.class
    │   │   │       ├── dto
    │   │   │       │   ├── request
    │   │   │       │   │   ├── UpdateMyInfoRequestDto.class
    │   │   │       │   │   └── UpdateUserPreferenceRequestDto.class
    │   │   │       │   └── response
    │   │   │       │       ├── MyInfoResponseDto.class
    │   │   │       │       ├── MyInfoResponseDto$MyInfoResponseDtoBuilder.class
    │   │   │       │       ├── MyInfoResponseDto$UserInfoDto.class
    │   │   │       │       ├── MyInfoResponseDto$UserInfoDto$UserInfoDtoBuilder.class
    │   │   │       │       ├── UpdateMyInfoResponseDto.class
    │   │   │       │       ├── UpdateMyInfoResponseDto$UpdateMyInfoResponseDtoBuilder.class
    │   │   │       │       ├── UpdateMyInfoResponseDto$UserInfoDto.class
    │   │   │       │       ├── UpdateMyInfoResponseDto$UserInfoDto$UserInfoDtoBuilder.class
    │   │   │       │       ├── UserPreferenceResponseDto.class
    │   │   │       │       ├── UserPreferenceResponseDto$PreferenceDto.class
    │   │   │       │       ├── UserPreferenceResponseDto$PreferenceDto$PreferenceDtoBuilder.class
    │   │   │       │       ├── UserPreferenceResponseDto$PreferredBuildingDto.class
    │   │   │       │       ├── UserPreferenceResponseDto$PreferredBuildingDto$PreferredBuildingDtoBuilder.class
    │   │   │       │       └── UserPreferenceResponseDto$UserPreferenceResponseDtoBuilder.class
    │   │   │       ├── entity
    │   │   │       │   ├── User.class
    │   │   │       │   ├── User$UserBuilder.class
    │   │   │       │   └── UserPreference.class
    │   │   │       ├── repository
    │   │   │       │   ├── UserPreferenceRepository.class
    │   │   │       │   └── UserRepository.class
    │   │   │       └── service
    │   │   │           └── UserService.class
    │   │   └── EmptybearApplication.class
    │   ├── generated
    │   │   └── sources
    │   │       ├── annotationProcessor
    │   │       │   └── java
    │   │       │       └── main
    │   │       └── headers
    │   │           └── java
    │   │               └── main
    │   ├── resources
    │   │   └── main
    │   │       └── application.yml
    │   ├── tmp
    │   │   ├── compileJava
    │   │   │   └── compileTransaction
    │   │   │       └── backup-dir
    │   │   │       └── stash-dir
    │   │   │           ├── BuildingController.class.uniqueId1
    │   │   │           ├── BuildingService.class.uniqueId5
    │   │   │           ├── BuildingService$ClassroomAvailability.class.uniqueId0
    │   │   │           ├── FloorClassroomStatusResponseDto.class.uniqueId6
    │   │   │           ├── FloorClassroomStatusResponseDto$ClassroomStatusDto.class.uniqueId2
    │   │   │           ├── FloorClassroomStatusResponseDto$ClassroomStatusDto$ClassroomStatusDtoBuilder.class.uniqueId4
    │   │   │           └── FloorClassroomStatusResponseDto$FloorClassroomStatusResponseDtoBuilder.class.uniqueId3
    │   │   └── previous-compilation-data.bin
    │   └── resolvedMainClassName
    ├── gradle
    │   └── wrapper
    │       ├── gradle-wrapper.jar
    │       └── gradle-wrapper.properties
    ├── init
    ├── src
    │   ├── main/java/com/dku/emptybear
    │   │   ├── common
    │   │   │   ├── config
    │   │   │   │   ├── SecurityConfig.java
    │   │   │   │   └── SwaggerConfig.java
    │   │   │   └── error
    │   │   │       ├── ErrorResponse.java
    │   │   │       ├── GlobalExceptionHandler.java
    │   │   │       └── JwtAuthenticationEntryPoint.java
    │   │   ├── domain
    │   │   │   ├── auth
    │   │   │   │   ├── controller
    │   │   │   │   │   └── AuthController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   ├── LoginRequestDto.java
    │   │   │   │   │   │   ├── LogoutRequestDto.java
    │   │   │   │   │   │   ├── ReissueRequestDto.java
    │   │   │   │   │   │   └── SignupRequestDto.java
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── AuthMessageResponseDto.java
    │   │   │   │   │       ├── LoginResponseDto.java
    │   │   │   │   │       ├── ReissueResponseDto.java
    │   │   │   │   │       └── SignupResponseDto.java
    │   │   │   │   ├── jwt
    │   │   │   │   │   ├── JwtAuthenticationFilter.java
    │   │   │   │   │   └── JwtTokenProvider.java
    │   │   │   │   └── service
    │   │   │   │       └── AuthService.java
    │   │   │   ├── building
    │   │   │   │   ├── controller
    │   │   │   │   │   └── BuildingController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── BuildingListResponseDto.java
    │   │   │   │   │       ├── FloorClassroomStatusResponseDto.java
    │   │   │   │   │       ├── FloorListResponseDto.java
    │   │   │   │   │       └── FloorPlanResponseDto.java
    │   │   │   │   ├── entity
    │   │   │   │   │   ├── Building.java
    │   │   │   │   │   └── FloorPlan.java
    │   │   │   │   ├── repository
    │   │   │   │   │   ├── BuildingRepository.java
    │   │   │   │   │   └── FloorPlanRepository.java
    │   │   │   │   └── service
    │   │   │   │       └── BuildingService.java
    │   │   │   ├── classroom
    │   │   │   │   ├── controller
    │   │   │   │   │   └── ClassroomController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── CreateReviewRequestDto.java
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── ClassroomDetailResponseDto.java
    │   │   │   │   │       ├── ClassroomOverviewListResponseDto.java
    │   │   │   │   │       ├── ClassroomReviewListResponseDto.java
    │   │   │   │   │       ├── ClassroomWeeklyScheduleResponseDto.java
    │   │   │   │   │       ├── CreateReviewResponseDto.java
    │   │   │   │   │       ├── DeleteReviewResponseDto.java
    │   │   │   │   │       └── RecentViewedClassroomListResponseDto.java
    │   │   │   │   ├── entity
    │   │   │   │   │   ├── Classroom.java
    │   │   │   │   │   ├── ClassroomViewHistory.java
    │   │   │   │   │   ├── Review.java
    │   │   │   │   │   ├── ReviewTag.java
    │   │   │   │   │   └── Schedule.java
    │   │   │   │   ├── repository
    │   │   │   │   │   ├── ClassroomRepository.java
    │   │   │   │   │   ├── ClassroomViewHistoryRepository.java
    │   │   │   │   │   ├── ReviewRepository.java
    │   │   │   │   │   ├── ReviewTagRepository.java
    │   │   │   │   │   └── ScheduleRepository.java
    │   │   │   │   └── service
    │   │   │   │       ├── ClassroomAvailabilityService.java
    │   │   │   │       └── ClassroomService.java
    │   │   │   ├── favorite
    │   │   │   │   ├── controller
    │   │   │   │   │   └── FavoriteController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── AddFavoriteRequestDto.java
    │   │   │   │   │   └── response
    │   │   │   │   │       ├── FavoriteClassroomListResponseDto.java
    │   │   │   │   │       └── FavoriteStatusResponseDto.java
    │   │   │   │   ├── entity
    │   │   │   │   │   └── Favorite.java
    │   │   │   │   ├── repository
    │   │   │   │   │   └── FavoriteRepository.java
    │   │   │   │   └── service
    │   │   │   │       └── FavoriteService.java
    │   │   │   ├── recommend
    │   │   │   │   ├── controller
    │   │   │   │   │   └── RecommendController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   ├── request
    │   │   │   │   │   │   └── RecommendRequestDto.java
    │   │   │   │   │   └── response
    │   │   │   │   │       └── RecommendClassroomResponseDto.java
    │   │   │   │   └── service
    │   │   │   │       ├── AvailabilityService.java
    │   │   │   │       └── RecommendService.java
    │   │   │   ├── tag
    │   │   │   │   ├── controller
    │   │   │   │   │   └── TagController.java
    │   │   │   │   ├── dto
    │   │   │   │   │   └── response
    │   │   │   │   │       └── ReviewTagListResponseDto.java
    │   │   │   │   ├── entity
    │   │   │   │   │   └── Tag.java
    │   │   │   │   ├── repository
    │   │   │   │   │   └── TagRepository.java
    │   │   │   │   └── service
    │   │   │   │       └── TagService.java
    │   │   │   └── user
    │   │   │       ├── controller
    │   │   │       │   └── UserController.java
    │   │   │       ├── dto
    │   │   │       │   ├── request
    │   │   │       │   │   ├── UpdateMyInfoRequestDto.java
    │   │   │       │   │   └── UpdateUserPreferenceRequestDto.java
    │   │   │       │   └── response
    │   │   │       │       ├── MyInfoResponseDto.java
    │   │   │       │       ├── UpdateMyInfoResponseDto.java
    │   │   │       │       └── UserPreferenceResponseDto.java
    │   │   │       ├── entity
    │   │   │       │   ├── User.java
    │   │   │       │   └── UserPreference.java
    │   │   │       ├── repository
    │   │   │       │   ├── UserPreferenceRepository.java
    │   │   │       │   └── UserRepository.java
    │   │   │       └── service
    │   │   │           └── UserService.java
    │   │   └── EmptybearApplication.java
    │   │   └── resources
    │   └── test
    │       ├── java
    │       │   └── com
    │       │       └── dku
    │       │           └── emptybear
    │       │               ├── domain
    │       │               │   └── recommend
    │       │               │       └── service
    │       │               │           └── AvailabilityServiceTest.java
    │       │               └── EmptybearApplicationTests.java
    │       └── resources
    │           └── application.properties
    ├── .gitattributes
    ├── .gitignore
    ├── build.gradle
    ├── gradlew
    ├── gradlew.bat
    └── settings.gradle
```

</details>

### 2. 환경 설정
* Gradle: Gradle 8.x 이상
* JDK: Java 17 권장
* MySQL: MySQL 8.4 권장
* Node.js: Node.js v24.15.0 사용
* npm: npm 11.12.1 사용
* Vite: Vite 8.0.11 사용
* React: React 19.2.6 사용


### 3. API 명세
* Auth
  * POST
    * `/api/auth/signup` : 회원가입
    * `/api/auth/login` : 로그인
    * `/api/auth/logout` : 로그아웃
    * `/api/auth/reissue` : 액세스 토큰 재발급
* User
  * GET
    * `/api/users/me` : 내 정보 조회
    * `/api/users/me/preferences` : 선호 설정 조회
  * PATCH
    * `/api/users/me` : 내 정보 수정
    * `/api/users/me/preferences0` : 선호 설정 수정
* Classrooms
  * POST
    * `/api/classrooms/{classroomId}/reviews` : 강의실 리뷰 작성
  * GET
    * `/api/classrooms` : 강의실 목록 조회
    * `/api/classrooms/{classroomId}` : 강의실 상세 조회
    * `/api/classrooms/recent-viewed` : 최근 조회한 강의실 목록
    * `/api/classrooms/{classroomId}/schedule` : 강의실 시간표 조회
    * `/api/classrooms/{classroomId}/reviews` : 강의실 리뷰 목록 조회
  * DELETE
    * `/api/classrooms/{classroomId}/reviews/{reviewId}` : 강의실 리뷰 삭제
* Buildings
  * GET
    * `/api/buildings` : 건물 목록 조회
    * `/api/buildings/{buildingId}/floors` : 층 목록 조회
    * `/api/buildings/{buildingId}/floors/{floorValue}/floor-plan` : 층별 평면도 조회
    * `/api/buildings/{buildingId}/floors/{floorValue}/classrooms/status` : 층별 강의실 상태 조회
* Favorites
  * POST
    * `/api/users/me/favorites` : 즐겨찾기 추가
  * GET
    * `/api/users/me/favorites` : 즐겨찾기 목록 조회
  * DELETE
    * `/api/users/me/favorites/{classroomId}` : 즐겨찾기 삭제
* Recommend
  * GET
    * `/api/recommend/classrooms` : 추천 강의실 목록 조회
* Tags
  * GET
    * `/api/tags/reviews` : 리뷰 태그 목록 조회


### 4. 커밋 컨벤션
* `타입: 제목` 형식으로 작성합니다.
  * ex) `git commit -m "feat: 로그인 UI 및 validation 추가"`
* 한 커밋에는 한 가지 문제만 다룹니다.


| type | 설명 | 참고사항 |
| :--- | :--- | :--- |
| feat | 기능 추가 | 기능 당 최초 한 번만 사용 |
| build | 라이브러리 세팅/업데이트 | 라이브러리 설치 최초 한 번만 사용 |
| update | 라이브러리 버전 업데이트/커스텀 | |
| config | Config 파일 설정 | |
| remove | 파일 삭제 | |
| fix | 기능 에러 수정 | |
| hotFix | 치명적인 버그 수정 | main 브랜치에 바로 반영 |
| style | UI 관련 CSS 수정 | |
| chore | 단순 코드 수정 | 주석, 줄 바꿈, 임포트문, 세미콜론 등등.. |
| revise | 기능 추가나 덧붙임을 위한 수정 | |
| typo | 오타 수정 | |
| modify | 기능 변경 있는 코드 개선/변경 | |
| refactor | 기능 변경 없는 코드 개선 (리팩토링 포함) | |
| asset | 이미지, 폰트 | 리소스 파일 |
| docs | 문서 작성 | |


### 5. 이슈 관리
* 이슈 제목에는 [FEAT] 와 같은 태그를 붙입니다.
* 이슈 템플릿에 맞춰 작성합니다.
* PR 작성 시 반드시 이슈 번호를 연결합니다.


### [README](README.md)

### [사용자 가이드](User_Guide.md)
---
