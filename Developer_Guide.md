# :wrench: 비었곰 개발자 가이드
### 1. 프로젝트 구조
* Frontend

* Backend

### 2. 환경 설정
* Gradle
* React
* Solid Cloud

### 3. API 명세
* Auth
  * POST
    * `/api/auth/signup` : 회원가입
    * `/api/auth/login` : 로그인
    * `/api/auth/logout 🔒` : 로그아웃
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

### 4. 테스트
* _

### 5. 커밋 컨벤션
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


### 6. 이슈 관리
* 이슈 제목에는 [FEAT] 와 같은 태그를 붙입니다.
* 이슈 템플릿에 맞춰 작성합니다.
* PR 작성 시 반드시 이슈 번호를 연결합니다.


---
