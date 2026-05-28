import { useEffect, useState } from "react";
import {
  getBuildingFloors,
  getBuildings,
  getFloorClassroomStatuses,
  getFloorPlan,
} from "../api/buildingApi";
import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";
import {
  Container as MapContainer,
  Marker,
  NaverMap,
  NavermapsProvider,
} from "react-naver-maps";

function normalizeClassroom(classroom) {
  return {
    ...classroom,
    buildingName: classroom.buildingName,
    status: classroom.status ?? classroom.availabilityStatus,
    nextClassTime:
      classroom.nextClassTime ?? classroom.nextClassStartTime ?? "없음",
  };
}

function MapPage({ favorites, onToggleFavorite, onOpenDetail, onMovePage }) {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [floorPlan, setFloorPlan] = useState(null);
  const [floorClassrooms, setFloorClassrooms] = useState([]);

  const defaultDankookUnivCoords = { lat: 37.320573, lng: 127.1276137 };

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
  }, []);

  useEffect(() => {
    if (!selectedBuilding) {
      return;
    }

    async function loadBuildingData() {
      try {
        const response = await getBuildingFloors(selectedBuilding.buildingId);
        const nextFloors = response.floors ?? [];

        setFloors(nextFloors);

        const hasFirstFloor = nextFloors.some((floor) => floor.floorValue === 1);
        setSelectedFloor(hasFirstFloor ? 1 : nextFloors[0]?.floorValue ?? 1);
      } catch (error) {
        alert(error.message || "층 목록을 불러오지 못했습니다.");
      }
    }

    loadBuildingData();
  }, [selectedBuilding]);

  useEffect(() => {
    if (!selectedBuilding) {
      return;
    }

    async function loadFloorData() {
      try {
        const [planResponse, statusResponse] = await Promise.all([
          getFloorPlan(selectedBuilding.buildingId, selectedFloor),
          getFloorClassroomStatuses(selectedBuilding.buildingId, selectedFloor),
        ]);

        setFloorPlan(planResponse.floorPlan ?? null);
        setFloorClassrooms(
          (statusResponse.classrooms ?? []).map((classroom) =>
            normalizeClassroom({
              ...classroom,
              buildingName: statusResponse.buildingName,
            })
          )
        );
      } catch (error) {
        alert(error.message || "층별 지도 정보를 불러오지 못했습니다.");
      }
    }

    loadFloorData();
  }, [selectedBuilding, selectedFloor]);

  const handleMapLoad = (map) => {
    if (!map) {
      return;
    }

    map.setCenter(defaultDankookUnivCoords);
    map.setZoom(16);
  };

  return (
    <NavermapsProvider ncpKeyId="r6eww9eh1v">
      <main className="page">
        <h1>지도</h1>

        {!selectedBuilding ? (
          <section className="campus-map-box">
            <p className="map-title">전체적인 학교 구조 평면도</p>

            <MapContainer
              style={{
                width: "360px",
                height: "350px",
                borderRadius: "8px",
                overflow: "hidden",
                flexShrink: 0,
                flexGrow: 0,
              }}
            >
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
                {buildings.map(
                  (building) =>
                    building.latitude &&
                    building.longitude && (
                      <Marker
                        key={building.buildingId}
                        position={{
                          lat: Number(building.latitude),
                          lng: Number(building.longitude),
                        }}
                        title={building.buildingName}
                        onClick={() => setSelectedBuilding(building)}
                      />
                    )
                )}
              </NaverMap>
            </MapContainer>

            <p className="map-helper-text">
              건물을 선택하면 해당 건물의 층별 평면도를 확인할 수 있습니다.
            </p>
          </section>
        ) : (
          <>
            <button
              className="back-button"
              onClick={() => setSelectedBuilding(null)}
            >
              ← 전체 학교 지도
            </button>

            <section
              className="map-box"
              style={{
                width: "390px",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {floorPlan?.imageUrl ? (
                <img
                  src={floorPlan.imageUrl}
                  alt={`${selectedBuilding.buildingName} ${floorPlan.floorLabel}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
              {floors.map((floor) => (
                <button
                  key={floor.floorValue}
                  className={selectedFloor === floor.floorValue ? "active" : ""}
                  onClick={() => setSelectedFloor(floor.floorValue)}
                >
                  {floor.floorLabel}
                </button>
              ))}
            </div>

            <section>
              <h2>
                {selectedBuilding.buildingName} {selectedFloor}층 강의실
              </h2>

              {floorClassrooms.length === 0 ? (
                <div className="empty-state">
                  해당 층의 등록된 강의실이 없습니다.
                </div>
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
