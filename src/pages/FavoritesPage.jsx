import BottomNav from "../components/BottomNav";
import ClassroomCard from "../components/ClassroomCard";

function FavoritesPage({
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onMovePage,
}) {
  return (
    <main className="page">
      <h1>즐겨찾기 목록</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">즐겨찾기한 강의실이 없습니다.</div>
      ) : (
        favorites.map((room) => (
          <ClassroomCard
            key={room.classroomId}
            classroom={room}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={onOpenDetail}
          />
        ))
      )}

      <BottomNav currentPage="favorites" onMovePage={onMovePage} />
    </main>
  );
}

export default FavoritesPage;
