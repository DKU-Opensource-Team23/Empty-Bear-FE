import { useState } from "react";
import { mockApi } from "../api/mockApi";
import { buildings } from "../data/mockApiData";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";
import FloorPlan from "../components/FloorPlan";
import { NavermapsProvider, Container as MapContainer, NaverMap, Marker} from "react-naver-maps";

function MapPage({
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onMovePage,
}) {
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);

  const [mapInstance, setMapInstance] = useState(null);
  const defaultDankookUnivCoords = { lat: 37.3205730, lng: 127.1276137 };
  const handleMapLoad = (map) => {
    setMapInstance(map);
    if (!map) return;
    map.setCenter(defaultDankookUnivCoords);
    map.setZoom(16);
    };

  const selectedBuilding = buildings.find(
    (building) => building.buildingId === selectedBuildingId
  );

  const floorClassrooms = selectedBuildingId
    ? mockApi.getFloorClassrooms({
        buildingId: selectedBuildingId,
        floor: selectedFloor,
      })
    : [];

  const handleSelectBuilding = (buildingId) => {
    setSelectedBuildingId(buildingId);
    // 건물 진입 시 사용자가 층을 고르기 전까지 1층을 기본값으로 둡니다.
    setSelectedFloor(1);
  };

  const svgUrl = selectedBuilding?.floorPlans?.[String(selectedFloor)];

  return (
    <NavermapsProvider ncpKeyId="r6eww9eh1v">
      <main className="page">
        <h1>지도</h1>

      {!selectedBuilding ? (
        <>
          <section className="campus-map-box">
            <p className="map-title">전체적인 학교 구조 평면도</p>

            <MapContainer style={{
              width: "360px",
              height: "350px",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
              flexGrow: 0,
              }}>
              <NaverMap
                defaultCenter={defaultDankookUnivCoords}
                onLoad={handleMapLoad}
                style={{ width: "360px", height: "350px" }}
                draggable={false}
                pinchZoom={false}
                keyboardShortcuts={false}
                zoomControl={false}
                scrollWheel={false}
                disableDoubleClickZoom={true}
                >
                {buildings.map((building) => (
                  building.latitude && building.longitude && (
                    <Marker
                      key={building.buildingId}
                      position={{ lat: building.latitude, lng: building.longitude }}
                      title={building.buildingName}
                      onClick={() => handleSelectBuilding(building.buildingId)}
                    />
                  )
                ))}
              </NaverMap>
            </MapContainer>
          </section>

          <section className="map-guide-box">
            <p>단국대학교</p>

            <div className="building-select-row">
              {buildings.map((building) => (
                <button
                  key={building.buildingId}
                  className="building-select-button"
                  onClick={() => handleSelectBuilding(building.buildingId)}
                >
                  {building.buildingName}
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <button
            className="back-button"
            onClick={() => setSelectedBuildingId(null)}
          >
            ← 전체 학교 지도
          </button>

          <section className="map-box" style={{
            width: "390px",
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {selectedBuilding.floorPlans && selectedBuilding.floorPlans[String(selectedFloor)] ? (
              <FloorPlan
                svgUrl={svgUrl}
                classrooms={floorClassrooms}
              />
            ) : (
              <p style={{ color: "#888", margin: 0 }}>
                {selectedBuilding.buildingName} {selectedFloor}층 평면도 준비 중
              </p>
            )}
          </section>
          <div className="status-legend">
            <span>
              <i className="legend-dot available" />
              사용 가능
            </span>
            <span>
              <i className="legend-dot soon" />곧 수업
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
            <h2>
              {selectedBuilding.buildingName} {selectedFloor}층 강의실
            </h2>

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
        </>
      )}

      <BottomNav currentPage="map" onMovePage={onMovePage} />
    </main>
  </NavermapsProvider>
  );
}

export default MapPage;
