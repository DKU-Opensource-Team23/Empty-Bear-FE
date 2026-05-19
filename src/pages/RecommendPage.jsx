import { useState } from "react";
import { mockApi } from "../api/mockApi";
import { buildings } from "../data/mockApiData";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";

function RecommendPage({
  preference,
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onMovePage,
}) {
  const [minAvailableTime, setMinAvailableTime] = useState(
    preference.minAvailableTime
  );
  const [preferredBuildingId, setPreferredBuildingId] = useState(
    preference.preferredBuildingId
  );
  const [needOutlet, setNeedOutlet] = useState(preference.needOutlet);

  const recommendedClassrooms = mockApi.getRecommendedClassrooms({
    minAvailableTime,
    preferredBuildingId,
    needOutlet,
  });

  const resetFilters = () => {
    setMinAvailableTime(preference.minAvailableTime);
    setPreferredBuildingId(preference.preferredBuildingId);
    setNeedOutlet(preference.needOutlet);
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
            value={preferredBuildingId}
            onChange={(e) => setPreferredBuildingId(Number(e.target.value))}
          >
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
      </section>

      <section>
        <h2>추천 결과</h2>

        {recommendedClassrooms.length === 0 ? (
          <div className="empty-state">조건에 맞는 강의실이 없습니다.</div>
        ) : (
          recommendedClassrooms.map((room) => (
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
