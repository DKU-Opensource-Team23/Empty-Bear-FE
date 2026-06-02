import { formatAvailableTime } from "../utils/timeFormat";

function ClassroomCard({
  classroom,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
}) {
  const isInUse = classroom.status === "IN_USE";
  const isAvailable =
    classroom.status === "AVAILABLE_LONG" ||
    classroom.status === "AVAILABLE_SHORT" ||
    classroom.status === "available";
  const availableText = isInUse
    ? "현재 수업중"
    : formatAvailableTime(classroom.availableMinutes);
  const availabilityChipClass = [
    "classroom-meta-chip",
    "availability-chip",
    isInUse ? "in-use" : "",
    isAvailable ? "available" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="classroom-card">
      <div className="card-main" onClick={() => onOpenDetail(classroom)}>
        <div className="card-title-row">
          <h3>
            {classroom.buildingName} {classroom.roomName}
          </h3>
        </div>
        <div className="classroom-meta-grid">
          <div className={availabilityChipClass}>
            <span>사용 가능 시간</span>
            <strong>{availableText}</strong>
          </div>
          <div className="classroom-meta-chip">
            <span>콘센트</span>
            <strong>{classroom.hasOutlet ? "있음" : "없음"}</strong>
          </div>
          <div className="classroom-meta-chip">
            <span>다음 수업</span>
            <strong>{classroom.nextClassTime ?? "없음"}</strong>
          </div>
        </div>
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
