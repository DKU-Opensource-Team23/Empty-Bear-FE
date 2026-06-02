import { formatAvailableTime } from "../utils/timeFormat";

const statusLabel = {
  AVAILABLE_LONG: "사용 가능",
  AVAILABLE_SOON: "곧 수업",
  IN_USE: "수업 중",
  OCCUPIED: "사용 중",
  available: "사용 가능",
  soon: "곧 수업",
  busy: "사용 중",
};

function ClassroomCard({
  classroom,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
}) {
  const isInUse = classroom.status === "IN_USE";

  return (
    <div className="classroom-card">
      <div className="card-main" onClick={() => onOpenDetail(classroom)}>
        <div className="card-title-row">
          <h3>
            {classroom.buildingName} {classroom.roomName}
          </h3>
          <span className={`status-badge ${classroom.status}`}>
            {statusLabel[classroom.status] ?? "상태 확인"}
          </span>
        </div>
        <p>
          사용 가능 시간:{" "}
          {isInUse
            ? "현재 수업중"
            : formatAvailableTime(classroom.availableMinutes)}
        </p>
        <p>콘센트: {classroom.hasOutlet ? "있음" : "없음"}</p>
        <p>다음 수업: {classroom.nextClassTime ?? "없음"}</p>
      </div>

      <button
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        onClick={() => onToggleFavorite(classroom)}
        aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}

export default ClassroomCard;
