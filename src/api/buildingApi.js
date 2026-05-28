import { apiRequest } from "./client";
import { endpoints } from "./endpoints";

export function getBuildings() {
  return apiRequest(endpoints.buildings.list);
}

export function getBuildingFloors(buildingId) {
  return apiRequest(endpoints.buildings.floors(buildingId));
}

export function getFloorPlan(buildingId, floorValue) {
  return apiRequest(endpoints.buildings.floorPlan(buildingId, floorValue));
}

export function getFloorClassroomStatuses(buildingId, floorValue) {
  return apiRequest(endpoints.buildings.floorClassrooms(buildingId, floorValue));
}
