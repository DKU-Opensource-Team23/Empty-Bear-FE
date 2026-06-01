const navItems = [
  { key: "home", label: "홈", icon: "home" },
  { key: "recommend", label: "검색", icon: "search" },
  { key: "map", label: "지도", icon: "map" },
  { key: "favorites", label: "즐겨찾기", icon: "star" },
];

function NavIcon({ type }) {
  if (type === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5v-9Z" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    );
  }

  if (type === "map") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8-4.2-4.1 5.9-.9L12 3Z" />
    </svg>
  );
}

function BottomNav({ currentPage, onMovePage }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={currentPage === item.key ? "active" : ""}
          onClick={() => onMovePage(item.key)}
        >
          <NavIcon type={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
