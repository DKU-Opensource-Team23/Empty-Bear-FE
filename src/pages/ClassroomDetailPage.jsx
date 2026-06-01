import { useEffect, useState } from "react";
import {
  getClassroomReviews,
  getClassroomSchedule,
} from "../api/classroomApi";
import { formatAvailableTime } from "../utils/timeFormat";

const dayLabels = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
  월요일: "월",
  화요일: "화",
  수요일: "수",
  목요일: "목",
  금요일: "금",
  토요일: "토",
  일요일: "일",
  월: "월",
  화: "화",
  수: "수",
  목: "목",
  금: "금",
  토: "토",
  일: "일",
};

const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

function getDayLabel(dayOfWeek) {
  return dayLabels[dayOfWeek] ?? dayOfWeek ?? "기타";
}

function groupSchedulesByDay(schedules) {
  return schedules.reduce((groups, schedule) => {
    const dayLabel = getDayLabel(schedule.dayOfWeek);
    return {
      ...groups,
      [dayLabel]: [...(groups[dayLabel] ?? []), schedule],
    };
  }, {});
}

function ClassroomDetailPage({
  classroom,
  favorites,
  onToggleFavorite,
  onMoveReview,
  onBack,
}) {
  const [reviews, setReviews] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const isFavorite = favorites.some(
    (room) => room.classroomId === classroom.classroomId
  );
  const visibleReviews = reviews.slice(0, 2);
  const schedulesByDay = groupSchedulesByDay(schedules);
  const extraDays = Object.keys(schedulesByDay).filter(
    (day) => !dayOrder.includes(day)
  );
  const visibleDays = [
    ...dayOrder.filter((day) => schedulesByDay[day]?.length),
    ...extraDays,
  ];

  useEffect(() => {
    async function loadDetailData() {
      try {
        const [reviewResponse, scheduleResponse] = await Promise.all([
          getClassroomReviews(classroom.classroomId, { limit: 2 }),
          getClassroomSchedule(classroom.classroomId),
        ]);

        setReviews(reviewResponse.reviews ?? []);
        setSchedules(scheduleResponse.weeklySchedule ?? []);
      } catch (error) {
        alert(error.message || "강의실 부가 정보를 불러오지 못했습니다.");
      }
    }

    loadDetailData();
  }, [classroom.classroomId]);

  return (
    <main className="page">
      <button className="back-button" onClick={onBack}>
        ← 뒤로가기
      </button>

      <section className="detail-box">
        <button
          className={`detail-favorite-button ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(classroom)}
          aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          {isFavorite ? "★" : "☆"}
        </button>

        <h1>
          {classroom.buildingName} {classroom.roomName}
        </h1>
        <p>사용 가능 시간: {formatAvailableTime(classroom.availableMinutes)}</p>
        <p>콘센트 여부: {classroom.hasOutlet ? "있음" : "없음"}</p>
        <p>다음 수업: {classroom.nextClassTime ?? "없음"}</p>

        <div className="detail-review-row">
          <div className="review-preview-list">
            {visibleReviews.length === 0 ? (
              <>
                <p className="empty-review">리뷰가 없습니다</p>
                <p className="empty-review">리뷰가 없습니다</p>
              </>
            ) : (
              <>
                {visibleReviews.map((review) => (
                  <p key={review.reviewId} className="review-preview">
                    {(review.tags ?? [])
                      .map((tag) => tag.displayName)
                      .join(" / ")}
                  </p>
                ))}
                {visibleReviews.length === 1 && (
                  <p className="empty-review">리뷰가 없습니다</p>
                )}
              </>
            )}
          </div>

          <button
            className="primary-button review-write-button"
            onClick={onMoveReview}
          >
            리뷰 작성
          </button>
        </div>
      </section>

      <section>
        <h2>해당 강의실의 수업 시간표</h2>
        {schedules.length === 0 ? (
          <div className="empty-state">등록된 시간표가 없습니다.</div>
        ) : (
          <div className="schedule-day-list">
            {visibleDays.map((day) => (
              <article key={day} className="schedule-day-card">
                <div className="schedule-day-label">{day}</div>
                <div className="schedule-block-list">
                  {schedulesByDay[day]
                    .slice()
                    .sort((a, b) =>
                      String(a.startTime).localeCompare(String(b.startTime))
                    )
                    .map((schedule) => (
                      <div
                        key={schedule.scheduleId}
                        className="schedule-block"
                      >
                        <div className="schedule-time">
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                        <strong>{schedule.subjectName}</strong>
                        {schedule.professorName && (
                          <span>{schedule.professorName}</span>
                        )}
                      </div>
                    ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ClassroomDetailPage;
