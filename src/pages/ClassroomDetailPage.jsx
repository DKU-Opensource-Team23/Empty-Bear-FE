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
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일",
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

const timetableDays = ["월", "화", "수", "목", "금"];
const timetableStartHour = 9;
const timetableEndHour = 22;
const timetableRowMinutes = 30;
const timetableRows =
  ((timetableEndHour - timetableStartHour) * 60) / timetableRowMinutes;
const timetableColors = [
  "#86cfc1",
  "#7f9ce3",
  "#d98778",
  "#e3c86b",
  "#9d85d8",
  "#e6a95f",
  "#a8c76e",
];

function getDayLabel(dayOfWeek) {
  return dayLabels[dayOfWeek] ?? dayOfWeek ?? "기타";
}

function parseTimeToMinutes(time) {
  const [hour, minute = "0"] = String(time ?? "00:00").split(":");
  return Number(hour) * 60 + Number(minute);
}

function getTimetableBlockStyle(schedule, index) {
  const startMinutes = parseTimeToMinutes(schedule.startTime);
  const endMinutes = parseTimeToMinutes(schedule.endTime);
  const dayIndex = timetableDays.indexOf(getDayLabel(schedule.dayOfWeek));
  const firstRow =
    Math.max(0, startMinutes - timetableStartHour * 60) / timetableRowMinutes;
  const rowSpan = Math.max(
    1,
    (endMinutes - startMinutes) / timetableRowMinutes
  );

  return {
    gridColumn: `${dayIndex + 2} / ${dayIndex + 3}`,
    gridRow: `${Math.floor(firstRow) + 2} / span ${Math.ceil(rowSpan)}`,
    backgroundColor: timetableColors[index % timetableColors.length],
  };
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
  const timetableSchedules = schedules.filter((schedule) =>
    timetableDays.includes(getDayLabel(schedule.dayOfWeek))
  );
  const isInUse = classroom.status === "IN_USE";
  const availableText = isInUse
    ? "현재 수업중"
    : formatAvailableTime(classroom.availableMinutes);

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
        <div className="detail-header">
          <div>
            <span>{classroom.buildingName}</span>
            <h1>{classroom.roomName}</h1>
          </div>
          <button
            className={`detail-favorite-button ${isFavorite ? "active" : ""}`}
            onClick={() => onToggleFavorite(classroom)}
            aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className={`detail-availability ${isInUse ? "in-use" : ""}`}>
          <span>사용 가능 시간</span>
          <strong>{availableText}</strong>
        </div>

        <div className="detail-meta-grid">
          <div className="detail-meta-chip">
            <span>콘센트</span>
            <strong>{classroom.hasOutlet ? "있음" : "없음"}</strong>
          </div>
          <div className="detail-meta-chip">
            <span>다음 수업</span>
            <strong>{classroom.nextClassTime ?? "없음"}</strong>
          </div>
        </div>

        <div className="detail-review-row">
          <div className="review-preview-list">
            {visibleReviews.length === 0 ? (
              <p className="empty-review">리뷰가 없습니다</p>
            ) : (
              visibleReviews.map((review) => (
                <div key={review.reviewId} className="review-preview">
                  {(review.tags ?? []).map((tag) => (
                    <span key={tag.tagId ?? tag.displayName}>
                      {tag.displayName}
                    </span>
                  ))}
                </div>
              ))
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
          <div
            className="weekly-timetable"
            style={{
              gridTemplateRows: `30px repeat(${timetableRows}, 28px)`,
            }}
          >
            <div className="timetable-corner" />
            {timetableDays.map((day) => (
              <div key={day} className="timetable-day-header">
                {day}
              </div>
            ))}

            {Array.from({ length: timetableRows }).map((_, rowIndex) => {
              const hour = timetableStartHour + Math.floor(rowIndex / 2);
              const isHourRow = rowIndex % 2 === 0;

              return (
                <div
                  key={`time-${rowIndex}`}
                  className="timetable-time-label"
                  style={{ gridRow: `${rowIndex + 2} / ${rowIndex + 3}` }}
                >
                  {isHourRow ? hour : ""}
                </div>
              );
            })}

            {timetableDays.map((day, dayIndex) =>
              Array.from({ length: timetableRows }).map((_, rowIndex) => (
                <div
                  key={`${day}-${rowIndex}`}
                  className="timetable-cell"
                  style={{
                    gridColumn: `${dayIndex + 2} / ${dayIndex + 3}`,
                    gridRow: `${rowIndex + 2} / ${rowIndex + 3}`,
                  }}
                />
              ))
            )}

            {timetableSchedules.map((schedule, index) => (
              <div
                key={schedule.scheduleId}
                className="timetable-class-block"
                style={getTimetableBlockStyle(schedule, index)}
              >
                <strong>{schedule.subjectName}</strong>
                <span>
                  {schedule.startTime} - {schedule.endTime}
                </span>
                {schedule.professorName && <span>{schedule.professorName}</span>}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ClassroomDetailPage;
