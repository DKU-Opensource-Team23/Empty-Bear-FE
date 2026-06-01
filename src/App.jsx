import { useEffect, useState } from "react";
import { logout } from "./api/authApi";
import { clearTokens, getAccessToken } from "./api/client";
import {
  getClassroomDetail,
  getRecentViewedClassrooms,
} from "./api/classroomApi";
import { addFavorite, deleteFavorite, getFavorites } from "./api/favoriteApi";
import { getMyInfo, getMyPreference } from "./api/userApi";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/RecommendPage";
import MapPage from "./pages/MapPage";
import FavoritesPage from "./pages/FavoritesPage";
import ReviewPage from "./pages/ReviewPage";
import ClassroomDetailPage from "./pages/ClassroomDetailPage";
import PreferencePage from "./pages/PreferencePage";

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
    isFavorite: classroom.isFavorite ?? false,
    availableMinutes:
      classroom.availableMinutes ??
      (classroom.availableHour ?? 0) * 60 + (classroom.availableMinute ?? 0),
    nextClassTime:
      classroom.nextClassTime ?? classroom.nextClassStartTime ?? "없음",
  };
}

function unwrapClassrooms(response) {
  return (response?.classrooms ?? []).map(normalizeClassroom).filter(Boolean);
}

const pagePaths = {
  login: "/login",
  signup: "/signup",
  home: "/",
  recommend: "/search",
  map: "/map",
  favorites: "/favorite",
};

function getPageFromPath(pathname) {
  const matchedPage = Object.entries(pagePaths).find(
    ([, path]) => path === pathname
  );

  return matchedPage?.[0] ?? "home";
}

function App() {
  const [user, setUser] = useState(null);
  const [preference, setPreference] = useState(null);
  const [page, setPage] = useState(() => getPageFromPath(window.location.pathname));
  const [previousPage, setPreviousPage] = useState("home");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recentClassrooms, setRecentClassrooms] = useState([]);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  const movePage = (nextPage) => {
    setPage(nextPage);

    const nextPath = pagePaths[nextPage];
    if (nextPath && window.location.pathname !== nextPath) {
      window.history.pushState({ page: nextPage }, "", nextPath);
    }
  };

  const loadUserData = async (fallbackUser = null) => {
    const [myInfoResponse, preferenceResponse, favoriteResponse, recentResponse] =
      await Promise.all([
        getMyInfo(),
        getMyPreference(),
        getFavorites(),
        getRecentViewedClassrooms(),
      ]);

    setUser(myInfoResponse.user ?? fallbackUser);
    setPreference(preferenceResponse.preference);
    setFavorites(unwrapClassrooms(favoriteResponse));
    setRecentClassrooms(unwrapClassrooms(recentResponse));
  };

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    async function restoreLogin() {
      if (!getAccessToken()) {
        setIsBootstrapping(false);
        return;
      }

      try {
        await loadUserData();
        const restoredPage = getPageFromPath(window.location.pathname);
        if (restoredPage === "login" || restoredPage === "signup") {
          movePage("home");
        }
      } catch {
        clearTokens();
        movePage("login");
      } finally {
        setIsBootstrapping(false);
      }
    }

    restoreLogin();
  }, []);

  const finishLogin = async (loginUser) => {
    setUser(loginUser);
    movePage("home");

    try {
      await loadUserData(loginUser);
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
      clearTokens();
      setUser(null);
      setPreference(null);
      setFavorites([]);
      setRecentClassrooms([]);
      setSelectedClassroom(null);
      movePage("login");
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
      setPreviousPage(page);
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
      setFavorites((prev) => [
        ...prev,
        normalizeClassroom({ ...classroom, isFavorite: true }),
      ]);
    } catch (error) {
      alert(error.message || "즐겨찾기 처리에 실패했습니다.");
    }
  };

  if (isBootstrapping) {
    return <main className="page loading-page">로그인 정보를 확인하는 중입니다.</main>;
  }

  if (!user) {
    if (page === "signup") {
      return <SignupPage onMoveToLogin={() => movePage("login")} />;
    }

    return (
      <LoginPage
        onMoveToSignup={() => movePage("signup")}
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
          onOpenPreference={() => setIsPreferenceModalOpen(true)}
          recentClassrooms={recentClassrooms}
          onOpenDetail={openClassroomDetail}
          onMovePage={movePage}
        />
      )}

      {isPreferenceModalOpen && (
        <PreferencePage
          preference={preference}
          onUpdatePreference={setPreference}
          onClose={() => setIsPreferenceModalOpen(false)}
          onMovePage={movePage}
        />
      )}

      {page === "recommend" && (
        <RecommendPage
          preference={preference}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={movePage}
        />
      )}

      {page === "map" && (
        <MapPage
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={movePage}
        />
      )}

      {page === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenDetail={openClassroomDetail}
          onMovePage={movePage}
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
          onBack={() => movePage(previousPage)}
        />
      )}
    </>
  );
}

export default App;
