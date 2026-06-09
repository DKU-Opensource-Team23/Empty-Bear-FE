import { useEffect, useState } from "react";
import { getBuildings } from "../api/buildingApi";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";
import { useToast } from "../components/ToastProvider";
import { getRecommendedClassrooms } from "../api/recommendApi";
import { formatAvailableTime, formatClassTime } from "../utils/timeFormat";

function TimeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 21V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v15" />
      <path d="M9 21v-5h3v5" />
      <path d="M8 8h1" />
      <path d="M12 8h1" />
      <path d="M8 12h1" />
      <path d="M12 12h1" />
      <path d="M3 21h18" />
    </svg>
  );
}

function OutletIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7V4" />
      <path d="M15 7V4" />
      <path d="M7 7h10v5a5 5 0 0 1-10 0V7Z" />
      <path d="M12 17v3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function normalizeClassroom(classroom) {
  const availableHour = classroom.availableHour ?? 0;
  const availableMinute = classroom.availableMinute ?? 0;
  const availableMinutes =
    classroom.availableMinutes ?? availableHour * 60 + availableMinute;

  return {
    ...classroom,
    classroomId: classroom.classroomId,
    roomName: classroom.roomName ?? classroom.classroomName,
    availableMinutes,
    status: classroom.status ?? classroom.availabilityStatus,
    isFavorite: classroom.isFavorite ?? false,
    nextClassTime: formatClassTime(
      classroom.nextClassTime ?? classroom.nextClassStartTime
    ),
  };
}

function toRecommendationTime(totalMinutes) {
  return {
    minAvailableHour: Math.floor(totalMinutes / 60),
    minAvailableMinute: totalMinutes % 60,
  };
}

function RecommendPage({
  preference,
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onMovePage,
}) {
  const preferredBuilding = preference?.preferredBuilding;
  const [minAvailableTime, setMinAvailableTime] = useState(
    preference?.minAvailableTime ?? 30
  );
  const [buildingId, setBuildingId] = useState(
    preferredBuilding?.buildingId ?? ""
  );
  const [needOutlet, setNeedOutlet] = useState(preference?.needOutlet ?? false);
  const [buildings, setBuildings] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { showToast } = useToast();

  const loadClassrooms = async () => {
    try {
      setHasSearched(true);
      setIsLoading(true);
      const { minAvailableHour, minAvailableMinute } =
        toRecommendationTime(minAvailableTime);

      const response = await getRecommendedClassrooms({
        buildingId,
        minAvailableHour,
        minAvailableMinute,
        needOutlet,
      });
      setClassrooms(
        (response.classrooms ?? [])
          .map(normalizeClassroom)
          .sort((left, right) => (right.availableMinutes ?? 0) - (left.availableMinutes ?? 0))
      );
    } catch (error) {
      showToast(error.message || "강의실 목록을 불러오지 못했습니다.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function loadBuildings() {
      try {
        const response = await getBuildings();
        setBuildings(response.buildings ?? []);
      } catch (error) {
        showToast(error.message || "건물 목록을 불러오지 못했습니다.", "error");
      }
    }

    loadBuildings();
  }, []);

  useEffect(() => {
    setMinAvailableTime(preference?.minAvailableTime ?? 30);
    setBuildingId(preference?.preferredBuilding?.buildingId ?? "");
    setNeedOutlet(preference?.needOutlet ?? false);
  }, [preference]);

  const resetFilters = () => {
    setMinAvailableTime(preference?.minAvailableTime ?? 30);
    setBuildingId(preference?.preferredBuilding?.buildingId ?? "");
    setNeedOutlet(preference?.needOutlet ?? false);
  };
  const rangeProgress = `${(minAvailableTime / 180) * 100}%`;
  const rangeProgressRatio = minAvailableTime / 180;

  return (
    <main className="page">
      <div className="page-title-row">
        <h1>검색</h1>
        <button className="ghost-button" onClick={resetFilters}>
          초기화
        </button>
      </div>

      <section className="filter-box">
        <label className="filter-group">
          <span className="filter-label-row">
            <span className="filter-icon-label">
              <TimeIcon />
              강의실 사용 가능 시간
            </span>
            <strong>{formatAvailableTime(minAvailableTime)} 이상</strong>
          </span>
          <span
            className="time-range-control"
            style={{
              "--range-progress": rangeProgress,
              "--range-progress-ratio": rangeProgressRatio,
            }}
          >
            <span className="time-range-icon">
              <TimeIcon />
            </span>
            <input
              type="range"
              min="0"
              max="180"
              step="10"
              value={minAvailableTime}
              onChange={(event) =>
                setMinAvailableTime(Number(event.target.value))
              }
              aria-label="강의실 사용 가능 시간"
            />
          </span>
        </label>

        <div className="filter-divider" />

        <label className="filter-group building-filter-group">
          <span className="filter-icon-label">
            <BuildingIcon />
            강의실 위치
          </span>
          <span className="building-select-shell">
            <span className="building-select-icon">
              <BuildingIcon />
            </span>
            <select
              value={buildingId}
              onChange={(event) => setBuildingId(event.target.value)}
              aria-label="강의실 위치"
            >
              <option value="">전체 건물</option>
              {buildings.map((building) => (
                <option key={building.buildingId} value={building.buildingId}>
                  {building.buildingName}
                </option>
              ))}
            </select>
          </span>
        </label>

        <div className="filter-action-row">
          <label className={`outlet-toggle ${needOutlet ? "active" : ""}`}>
            <input
              type="checkbox"
              checked={needOutlet}
              onChange={(event) => setNeedOutlet(event.target.checked)}
              aria-label="콘센트 필요"
            />
            <span className="outlet-toggle-track">
              <span className="outlet-toggle-thumb">
                <OutletIcon />
              </span>
              <span className="outlet-toggle-text">
                {needOutlet ? "콘센트 있어요" : "콘센트 없어요"}
              </span>
            </span>
          </label>

          <button
            className="primary-button search-submit-button icon-only"
            onClick={loadClassrooms}
            aria-label="검색"
          >
            <SearchIcon />
          </button>
        </div>
      </section>

      {hasSearched && (
        <section>
          <h2>검색 결과</h2>

          {isLoading ? (
            <div className="empty-state">강의실을 불러오는 중입니다.</div>
          ) : classrooms.length === 0 ? (
            <div className="empty-state">조건에 맞는 강의실이 없습니다.</div>
          ) : (
            classrooms.map((room) => (
              <ClassroomCard
                key={room.classroomId}
                classroom={room}
                isFavorite={
                  room.isFavorite ||
                  favorites.some((fav) => fav.classroomId === room.classroomId)
                }
                onToggleFavorite={onToggleFavorite}
                onOpenDetail={onOpenDetail}
              />
            ))
          )}
        </section>
      )}

      <BottomNav currentPage="recommend" onMovePage={onMovePage} />
    </main>
  );
}

export default RecommendPage;
