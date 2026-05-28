import { useState } from "react";
import { logout } from "./api/authApi";
import { getClassroomDetail } from "./api/classroomApi";
import { addFavorite, deleteFavorite, getFavorites } from "./api/favoriteApi";
import { getMyPreference } from "./api/userApi";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/RecommendPage";
import MapPage from "./pages/MapPage";
import FavoritesPage from "./pages/FavoritesPage";
import ReviewPage from "./pages/ReviewPage";
import ClassroomDetailPage from "./pages/ClassroomDetailPage";

function normalizeClassroom(classroom) {
  if (!classroom) {
    return null;
  }

  return {
    ...classroom,
    buildingId: classroom.buildingId ?? classroom.building?.buildingId,
    buildingName: classroom.buildingName ?? classroom.building?.buildingName,
    floor: classroom.floor ?? classroom.floorValue,
    status: classroom.status ?? classroom.availabilityStatus,
    nextClassTime:
      classroom.nextClassTime ?? classroom.nextClassStartTime ?? "없음",
  };
}

function unwrapClassrooms(response) {
  return (response?.classrooms ?? []).map(normalizeClassroom).filter(Boolean);
}

function App() {
  const [user, setUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [page, setPage] = useState("login");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recentClassrooms, setRecentClassrooms] = useState([]);

  const finishLogin = async (loginUser) => {
    setUser(loginUser);
    setPage("home");

    try {
      const [preferenceResponse, favoriteResponse] = await Promise.all([
        getMyPreference(),
        getFavorites(),
      ]);

      setPreference(preferenceResponse.preference);
      setFavorites(unwrapClassrooms(favoriteResponse));
    } catch (error) {
      alert("로그인은 되었지만 사용자 정보를 불러오지 못했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // The screen should still return to login even if the server logout fails.
    } finally {
      setUser(null);
      setPreference(null);
      setFavorites([]);
      setRecentClassrooms([]);
      setSelectedClassroom(null);
      setPage("login");
    }
  };

  const openClassroomDetail = async (classroom) => {
    try {
      const response = await getClassroomDetail(classroom.classroomId);
      const classroomDetail = normalizeClassroom(response.classroom);

      setSelectedClassroom(classroomDetail);
      setRecentClassrooms((prev) => {
        const filtered = prev.filter(
          (room) => room.classroomId !== classroomDetail.classroomId
        );
        return [classroomDetail, ...filtered].slice(0, 5);
      });
      setPage("detail");
    } catch (error) {
      alert(error.message || "강의실 상세 정보를 불러오지 못했습니다.");
    }
  };

  const toggleFavorite = async (classroom) => {
    const alreadyExists = favorites.some(
      (room) => room.classroomId === classroom.classroomId
    );

    try {
      if (alreadyExists) {
        await deleteFavorite(classroom.classroomId);
        setFavorites((prev) =>
          prev.filter((room) => room.classroomId !== classroom.classroomId)
        );
        return;
      }

      await addFavorite(classroom.classroomId);
      setFavorites((prev) => [...prev, normalizeClassroom(classroom)]);
    } catch (error) {
      alert(error.message || "즐겨찾기 처리에 실패했습니다.");
    }
  };

  if (!user) {
    if (page === "signup") {
      return <SignupPage onMoveToLogin={() => setPage("login")} />;
    }

    return (
      <LoginPage
        onMoveToSignup={() => setPage("signup")}
        onLogin={(loginUser) => finishLogin(loginUser)}
      />
    );
  }

  return (
    <>
      {page === "home" && (
        <HomePage
          user={user}
          onUpdateUser={setUser}
          onLogout={handleLogout}
          recentClassrooms={recentClassrooms}
          onOpenDetail={openClassroomDetail}
          onMovePage={setPage}
        />
      )}

      {page === "recommend" && (
        <RecommendPage
          preference={preference}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={setPage}
        />
      )}

      {page === "map" && (
        <MapPage
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={setPage}
        />
      )}

      {page === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={setPage}
        />
      )}

      {page === "review" && selectedClassroom && (
        <ReviewPage
          classroom={selectedClassroom}
          onBack={() => setPage("detail")}
        />
      )}

      {page === "detail" && selectedClassroom && (
        <ClassroomDetailPage
          classroom={selectedClassroom}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onMoveReview={() => setPage("review")}
          onBack={() => setPage("home")}
        />
      )}
    </>
  );
}

export default App;
