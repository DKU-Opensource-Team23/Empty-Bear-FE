import BottomNav from "../components/BottomNav";

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

  return (
    <main className="page">
      <section className="home-card profile-card">
        <div className="profile-image-wrap">
          {user.profileImageUrl ? (
            <img
              className="profile-image"
              src={user.profileImageUrl}
              alt="사용자 프로필"
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
            <strong>닉네임:</strong> {user.nickname}
          </p>
          <p>
            <strong>학번:</strong> {user.studentNumber}
          </p>
          <p>
            <strong>학과:</strong> {user.department}
          </p>
        </div>

        <div className="profile-action-group">
          <button className="ghost-button" onClick={onLogout}>
            로그아웃
          </button>
          <button
            className="ghost-button"
            onClick={onOpenPreference}
          >
            선호 설정
          </button>
        </div>
      </section>

      <section className="home-card recent-card">
        <h2>최근 조회한 강의실</h2>

        {recentClassrooms.length === 0 ? (
          <div className="empty-state">아직 조회한 강의실이 없습니다.</div>
        ) : (
          recentClassrooms.map((room) => (
            <button
              key={room.classroomId}
              className="recent-room"
              onClick={() => onOpenDetail(room)}
            >
              {room.buildingName} {room.roomName}
            </button>
          ))
        )}
      </section>

      <BottomNav currentPage="home" onMovePage={onMovePage} />
    </main>
  );
}

export default HomePage;
