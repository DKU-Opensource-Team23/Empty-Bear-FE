import { useEffect, useState } from "react";
import { getBuildings } from "../api/buildingApi";
import { getClassrooms } from "../api/classroomApi";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";

function normalizeClassroom(classroom) {
  return {
    ...classroom,
    status: classroom.status ?? classroom.availabilityStatus,
    nextClassTime:
      classroom.nextClassTime ?? classroom.nextClassStartTime ?? "없음",
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

  const loadClassrooms = async () => {
    try {
      setIsLoading(true);
      const response = await getClassrooms({
        buildingId,
        minAvailableTime,
        hasOutlet: needOutlet,
      });
      setClassrooms((response.classrooms ?? []).map(normalizeClassroom));
    } catch (error) {
      alert(error.message || "강의실 목록을 불러오지 못했습니다.");
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
        alert(error.message || "건물 목록을 불러오지 못했습니다.");
      }
    }

    loadBuildings();
    loadClassrooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFilters = () => {
    setMinAvailableTime(preference?.minAvailableTime ?? 30);
    setBuildingId(preference?.preferredBuilding?.buildingId ?? "");
    setNeedOutlet(preference?.needOutlet ?? false);
  };

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
          <span>강의실 사용 가능 시간</span>
          <input
            type="range"
            min="0"
            max="180"
            step="10"
            value={minAvailableTime}
            onChange={(e) => setMinAvailableTime(Number(e.target.value))}
          />
          {minAvailableTime}분 이상
        </label>

        <div className="filter-divider" />

        <label className="filter-group">
          <span>강의실 위치</span>
          <select
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
          >
            <option value="">전체 건물</option>
            {buildings.map((building) => (
              <option key={building.buildingId} value={building.buildingId}>
                {building.buildingName}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={needOutlet}
            onChange={(e) => setNeedOutlet(e.target.checked)}
          />
          콘센트 필요
        </label>

        <button
          className="primary-button search-submit-button"
          onClick={loadClassrooms}
        >
          검색
        </button>
      </section>

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
              isFavorite={favorites.some(
                (fav) => fav.classroomId === room.classroomId
              )}
              onToggleFavorite={onToggleFavorite}
              onOpenDetail={onOpenDetail}
            />
          ))
        )}
      </section>

      <BottomNav currentPage="recommend" onMovePage={onMovePage} />
    </main>
  );
}

export default RecommendPage;
