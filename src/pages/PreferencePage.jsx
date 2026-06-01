import { useEffect, useState } from "react";
import { getBuildings } from "../api/buildingApi";
import { updateMyPreference } from "../api/userApi";
import { formatAvailableTime } from "../utils/timeFormat";

function PreferencePage({
  preference,
  onUpdatePreference,
  onClose,
  onMovePage,
}) {
  const [buildings, setBuildings] = useState([]);
  const [preferredBuildingId, setPreferredBuildingId] = useState("");
  const [minAvailableTime, setMinAvailableTime] = useState("");
  const [needOutlet, setNeedOutlet] = useState("");
  const [isSavingPreference, setIsSavingPreference] = useState(false);

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
    setPreferredBuildingId(preference?.preferredBuilding?.buildingId ?? "");
    setMinAvailableTime(preference?.minAvailableTime ?? "");
    setNeedOutlet(
      preference?.needOutlet === null || preference?.needOutlet === undefined
        ? ""
        : String(preference.needOutlet)
    );
  }, [preference]);

  const handleSaveAndSearch = async () => {
    const hasPreferenceValue =
      preferredBuildingId !== "" || minAvailableTime !== "" || needOutlet !== "";

    if (!hasPreferenceValue) {
      alert("저장할 선호 설정을 하나 이상 선택해주세요.");
      return;
    }

    try {
      setIsSavingPreference(true);
      const response = await updateMyPreference({
        preferredBuildingId:
          preferredBuildingId === "" ? null : Number(preferredBuildingId),
        minAvailableTime:
          minAvailableTime === "" ? null : Number(minAvailableTime),
        needOutlet: needOutlet === "" ? null : needOutlet === "true",
      });

      onUpdatePreference(response.preference);
      alert("선호 설정이 저장되었습니다.");
      onClose();
      onMovePage("recommend");
    } catch (error) {
      alert(error.message || "선호 설정 저장에 실패했습니다.");
    } finally {
      setIsSavingPreference(false);
    }
  };

  const preferenceSummary = [
    preference?.preferredBuilding?.buildingName ?? "선호 건물 미설정",
    preference?.minAvailableTime
      ? `${formatAvailableTime(preference.minAvailableTime)} 이상`
      : "선호 시간 미설정",
    preference?.needOutlet === null || preference?.needOutlet === undefined
      ? "콘센트 여부 미설정"
      : preference.needOutlet
        ? "콘센트 필요"
        : "콘센트 무관",
  ];

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <section
        className="preference-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preference-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="page-title-row">
          <h2 id="preference-modal-title">선호 설정</h2>
          <button className="modal-close-button" onClick={onClose}>
            닫기
          </button>
        </div>

        <div className="preference-summary">
          {preferenceSummary.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <label className="filter-group">
          <span>선호 건물</span>
          <select
            value={preferredBuildingId}
            onChange={(event) => setPreferredBuildingId(event.target.value)}
          >
            <option value="">설정 안 함</option>
            {buildings.map((building) => (
              <option key={building.buildingId} value={building.buildingId}>
                {building.buildingName}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-group">
          <span>선호 시간</span>
          <select
            value={minAvailableTime}
            onChange={(event) => setMinAvailableTime(event.target.value)}
          >
            <option value="">설정 안 함</option>
            <option value="30">30분 이상</option>
            <option value="60">1시간 이상</option>
            <option value="90">1시간 30분 이상</option>
            <option value="120">2시간 이상</option>
            <option value="180">3시간 이상</option>
          </select>
        </label>

        <label className="filter-group">
          <span>콘센트 여부</span>
          <select
            value={needOutlet}
            onChange={(event) => setNeedOutlet(event.target.value)}
          >
            <option value="">설정 안 함</option>
            <option value="true">콘센트 필요</option>
            <option value="false">콘센트 무관</option>
          </select>
        </label>

        <div className="review-submit-row">
          <button
            className="primary-button"
            onClick={handleSaveAndSearch}
            disabled={isSavingPreference}
          >
            {isSavingPreference ? "저장 중" : "저장 후 검색"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default PreferencePage;
