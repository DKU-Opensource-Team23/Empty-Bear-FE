# :bear: 비었곰 프로젝트 README
### 1. 프로젝트 소개
비었곰(EmptyBear)은 학생들이 빈 강의실을 빠르게 탐색할 수 있도록 돕는 서비스입니다.  
단국대학교 강의 시간표 데이터를 기반으로 현재 시각에 사용 가능한 강의실을 계산하여 강의실을 추천합니다.
### 2. 주요 기능
* 홈
  * 프로필 및 선호 설정 수정
  * 최근 조회 강의실 확인
* 검색
  * 사용 가능 시간, 건물, 콘센트 여부로 필터링하여 빈 강의실을 탐색
  * 선호 설정을 통해 검색 설정 자동화
* 지도
  * 캠퍼스 지도에서 건물을 선택하여 건물 층별 평면도 확인
  * 층별 평면도 및 층별 강의실 확인
* 즐겨찾기
  * 강의실 카드 우상단 별표로 츨겨찾기
  * 즐겨찾기 된 강의실 목록 확인

### 3. 실행 방법
1. 저장소 복제  
   `git clone https://github.com/DKU-Opensource-Team23/Empty-Bear-FE.git`  
   `git clone https://github.com/DKU-Opensource-Team23/Empty-Bear-BE.git`
2. 백엔드 서버 실행  
    `gradlew bootrun`
3. 개발 실행  
    `npm install`  
    `npm run dev`

### [사용자 가이드](User_Guide.md)

### [개발자 가이드](Developer_Guide.md)
---
