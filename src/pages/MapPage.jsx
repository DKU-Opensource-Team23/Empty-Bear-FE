import { useState } from "react";
import { mockApi } from "../api/mockApi";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";

const selectedBuildingId = 1;

function MapPage({
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onMovePage,
}) {
  const [selectedFloor, setSelectedFloor] = useState(3);
  const floorClassrooms = mockApi.getFloorClassrooms({
    buildingId: selectedBuildingId,
    floor: selectedFloor,
  });

  return (
    <main className="page">
      <h1>지도</h1>

      <section className="map-box">
        <p>소웨관 {selectedFloor}층 평면도 영역</p>
      </section>

      <div className="status-legend">
        <span>
          <i className="legend-dot available" />
          사용 가능
        </span>
        <span>
          <i className="legend-dot soon" />
          곧 수업
        </span>
        <span>
          <i className="legend-dot busy" />
          사용 중
        </span>
      </div>

      <div className="floor-buttons">
        {[1, 2, 3, 4, 5].map((floor) => (
          <button
            key={floor}
            className={selectedFloor === floor ? "active" : ""}
            onClick={() => setSelectedFloor(floor)}
          >
            {floor}층
          </button>
        ))}
      </div>

      <section>
        <h2>{selectedFloor}층 강의실</h2>

        {floorClassrooms.length === 0 ? (
          <div className="empty-state">해당 층의 등록된 강의실이 없습니다.</div>
        ) : (
          floorClassrooms.map((room) => (
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

      <BottomNav currentPage="map" onMovePage={onMovePage} />
    </main>
  );
}

export default MapPage;
