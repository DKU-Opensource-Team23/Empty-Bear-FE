import BottomNav from "../components/BottomNav";
import { formatAvailableTime } from "../utils/timeFormat";

function getRecentRoomStatus(room) {
  if (room.status === "IN_USE") {
    return {
      label: "현재 수업 중",
      className: "in-use",
    };
  }

  if (room.status === "UNAVAILABLE") {
    return {
      label: "사용 불가",
      className: "unavailable",
    };
  }

  return {
    label: formatAvailableTime(room.availableMinutes),
    className: "available",
  };
}

function HomePage({
  user,
  onUpdateUser,
  onLogout,
  onOpenPreference,
  recentClassrooms,
  onOpenDetail,
  onMovePage,
}) {
  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    onUpdateUser((prev) => ({
      ...prev,
      profileImageUrl: imageUrl,
    }));
  };

  const visibleRecentClassrooms = recentClassrooms.slice(0, 3);

  return (
    <main className="page">
      <section className="home-hero">
        <span className="home-hero-eyebrow">Empty Bear</span>
        <h1>안녕하세요, {user.nickname}님</h1>
        <p>오늘도 빈 강의실을 찾아볼까요?</p>
      </section>

      <section className="home-card profile-card">
        <div className="profile-main-row">
          <div className="profile-image-wrap">
            {user.profileImageUrl ? (
              <img
                className="profile-image"
                src={user.profileImageUrl}
                alt="사용자 프로필 이미지"
              />
            ) : (
              <div className="default-avatar" aria-label="기본 사용자 이미지" />
            )}

            <label className="profile-edit-button" aria-label="프로필 사진 수정">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
                <path d="m14 7 3 3" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>

          <div className="profile-info">
            <p>
              <strong>닉네임</strong>
              <span>{user.nickname}</span>
            </p>
            <p>
              <strong>학번</strong>
              <span>{user.studentNumber}</span>
            </p>
            <p>
              <strong>학과</strong>
              <span>{user.department}</span>
            </p>
          </div>
        </div>

        <div className="profile-action-group">
          <button className="ghost-button" onClick={onOpenPreference}>
            선호 설정
          </button>
          <button className="ghost-button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </section>

      <section className="home-card recent-card">
        <div className="section-title-row">
          <h2>최근 조회한 강의실</h2>
        </div>

        {recentClassrooms.length === 0 ? (
          <div className="empty-state">아직 조회한 강의실이 없습니다.</div>
        ) : (
          <>
            <div className="recent-room-list">
              {visibleRecentClassrooms.map((room) => {
                const status = getRecentRoomStatus(room);

                return (
                  <button
                    key={room.classroomId}
                    className="recent-room"
                    onClick={() => onOpenDetail(room)}
                  >
                    <span className="recent-room-main">
                      <strong>
                        {room.buildingName} {room.roomName}
                      </strong>
                      <small>다음 수업 {room.nextClassTime ?? "없음"}</small>
                    </span>
                    <span className="recent-room-side">
                      <span className={`recent-room-status ${status.className}`}>
                        {status.label}
                      </span>
                      <span className="recent-room-arrow" aria-hidden="true">
                        ›
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {recentClassrooms.length > visibleRecentClassrooms.length && (
              <p className="recent-room-count">
                최근 조회 {visibleRecentClassrooms.length}개 표시 중
              </p>
            )}
          </>
        )}
      </section>

      <section className="home-card home-cta-card">
        <div>
          <h2>빈 강의실을 찾고 있나요?</h2>
          <p>검색이나 지도에서 원하는 강의실을 빠르게 찾아보세요.</p>
        </div>
        <button className="primary-button" onClick={() => onMovePage("recommend")}>
          강의실 검색하기
        </button>
      </section>

      <BottomNav currentPage="home" onMovePage={onMovePage} />
    </main>
  );
}

export default HomePage;
