import BottomNav from "../components/BottomNav";

function HomePage({
  user,
  onUpdateUser,
  onLogout,
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

          <label className="profile-edit-button">
            수정
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

        <button className="ghost-button logout-button" onClick={onLogout}>
          로그아웃
        </button>
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
