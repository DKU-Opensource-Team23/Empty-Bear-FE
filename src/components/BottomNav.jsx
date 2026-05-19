const navItems = [
  { key: "home", label: "홈" },
  { key: "recommend", label: "검색" },
  { key: "map", label: "지도" },
  { key: "favorites", label: "즐겨찾기" },
];

function BottomNav({ currentPage, onMovePage }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={currentPage === item.key ? "active" : ""}
          onClick={() => onMovePage(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
