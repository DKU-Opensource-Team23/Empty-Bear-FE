import { useState } from "react";
import { mockApi } from "./api/mockApi";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/RecommendPage";
import MapPage from "./pages/MapPage";
import FavoritesPage from "./pages/FavoritesPage";
import ReviewPage from "./pages/ReviewPage";
import ClassroomDetailPage from "./pages/ClassroomDetailPage";

function App() {
  const [user, setUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [page, setPage] = useState("login");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recentClassrooms, setRecentClassrooms] = useState([]);

  const finishLogin = (loginUser) => {
    setUser(loginUser);
    setPreference(mockApi.getPreferences());
    setFavorites(mockApi.getFavorites());
    setRecentClassrooms(mockApi.getRecentClassrooms());
    setPage("home");
  };

  const openClassroomDetail = (classroom) => {
    const classroomDetail = mockApi.getClassroomDetail(classroom.classroomId);
    setSelectedClassroom(classroomDetail);

    setRecentClassrooms((prev) => {
      const filtered = prev.filter(
        (room) => room.classroomId !== classroom.classroomId
      );
      return [classroomDetail, ...filtered].slice(0, 5);
    });

    setPage("detail");
  };

  const toggleFavorite = (classroom) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some(
        (room) => room.classroomId === classroom.classroomId
      );

      if (alreadyExists) {
        return prev.filter(
          (room) => room.classroomId !== classroom.classroomId
        );
      }

      return [...prev, classroom];
    });
  };

  if (!user) {
    if (page === "signup") {
      return (
        <SignupPage
          onMoveToLogin={() => setPage("login")}
          onSignup={(newUser) => finishLogin(newUser)}
        />
      );
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
          onLogout={() => {
            setUser(null);
            setPreference(null);
            setPage("login");
          }}
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
