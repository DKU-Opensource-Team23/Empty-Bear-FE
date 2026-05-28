import { useEffect, useState } from "react";
import {
  getClassroomReviews,
  getClassroomSchedule,
} from "../api/classroomApi";

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
        <p>사용 가능 시간: {classroom.availableMinutes ?? 0}분</p>
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
          <div className="schedule-list">
            {schedules.map((schedule) => (
              <div key={schedule.scheduleId} className="schedule-item">
                <strong>{schedule.dayOfWeek}</strong>
                <span>
                  {schedule.startTime} - {schedule.endTime}
                </span>
                <span>{schedule.subjectName}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ClassroomDetailPage;
