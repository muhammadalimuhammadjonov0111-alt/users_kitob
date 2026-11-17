import { FiBookOpen, FiHeart, FiShoppingBag, FiSearch } from "react-icons/fi";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  favoritesCount: number;
  purchasedCount: number;
  activeTab: "all" | "favorites" | "purchased";
  setActiveTab: (tab: "all" | "favorites" | "purchased") => void;
}

function Header({
  searchTerm,
  setSearchTerm,
  favoritesCount,
  purchasedCount,
  activeTab,
  setActiveTab,
}: HeaderProps) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo" onClick={() => setActiveTab("all")}>
          <div className="logo-badge">M</div>
          <span className="logo-text">
            Mutolaa<span className="logo-accent">Hub</span>
          </span>
        </div>

        <div className="nav-search">
          <FiSearch className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Kitob nomi yoki muallifni izlang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav className="nav-actions">
          <button
            className={`nav-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <FiBookOpen size={17} />
            <span>Katalog</span>
          </button>

          <button
            className={`nav-btn fav-nav-btn ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <FiHeart size={17} />
            <span>Saqlanganlar</span>
            {favoritesCount > 0 && (
              <span className="fav-badge">{favoritesCount}</span>
            )}
          </button>

          <button
            className={`nav-btn fav-nav-btn ${
              activeTab === "purchased" ? "active" : ""
            }`}
            onClick={() => setActiveTab("purchased")}
            title="Xarid qilingan kitoblar"
          >
            <FiShoppingBag size={18} />
            {purchasedCount > 0 && (
              <span className="fav-badge purchased-badge">{purchasedCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
