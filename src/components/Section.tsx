export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  available: boolean;
  image?: string;
  price: number;
}

interface SectionProps {
  books: Book[];
  loading: boolean;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  purchased: string[];
  handlePurchase: (book: Book) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
  activeTab: "all" | "favorites" | "purchased";
}

function Section({
  books,
  loading,
  favorites,
  toggleFavorite,
  purchased,
  handlePurchase,
  selectedCategory,
  setSelectedCategory,
  categories,
  activeTab,
}: SectionProps) {
  const getSectionTitle = () => {
    if (activeTab === "favorites") return "Saqlangan kitoblar";
    if (activeTab === "purchased") return "Xarid qilingan kitoblar";
    return "Kitoblar katalogi";
  };

  const getEmptyMessage = () => {
    if (activeTab === "favorites") return "Saqlangan kitoblar ro‘yxati bo‘sh.";
    if (activeTab === "purchased") return "Hali hech qanday kitob xarid qilinmagan.";
    return "So‘rovingiz bo‘yicha kitob topilmadi.";
  };

  return (
    <main className="main-content">
      <section className="hero-banner">
        <div className="hero-text">
          <span className="hero-subtitle">ELEKTRON KUTUBXONA VA DO‘KON</span>
          <h1>Bilim va tafakkur xazinasi</h1>
          <p>
            Jahon va o‘zbek adabiyotining eng sara durdonalarini bir joyda
            jamlangan holda kashf eting.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-box">
            <strong>20+</strong>
            <span>Sara asarlar</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-box">
            <strong>6</strong>
            <span>Asosiy janr</span>
          </div>
        </div>
      </section>

      <div className="filter-header">
        <h2 className="section-title">{getSectionTitle()}</h2>
        <div className="categories-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loader">Ma’lumotlar yuklanmoqda...</div>
      ) : (
        <div className="books-grid">
          {books.length > 0 ? (
            books.map((book, index) => {
              const isFav = favorites.includes(book.id);
              const isBought = purchased.includes(book.id);

              return (
                <article key={book.id} className="book-card">
                  <div className="book-cover-box">
                    <img
                      src={
                        book.image ||
                        `https://picsum.photos{index + 1}`
                      }
                      alt={book.title}
                      className="book-img"
                    />

                    <button
                      type="button"
                      className={`heart-btn ${isFav ? "liked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(book.id);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={isFav ? "#dc2626" : "none"}
                        stroke={isFav ? "#dc2626" : "#334155"}
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    <span className="year-tag">{book.year}</span>
                  </div>

                  <div className="book-details">
                    <div className="book-meta">
                      <span className="genre-label">{book.category}</span>
                      <span
                        className={`availability-dot ${
                          book.available ? "in" : "out"
                        }`}
                      ></span>
                    </div>

                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>

                    <div className="card-bottom">
                      <div className="price-block">
                        <span className="price-label">Narxi</span>
                        <span className="book-price">
                          {Number(book.price || 0).toLocaleString("uz-UZ")} so‘m
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`rent-btn ${
                          isBought ? "bought" : "primary"
                        }`}
                        onClick={() => handlePurchase(book)}
                      >
                        {isBought ? "Bekor qilish" : "Xarid qilish"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="empty-state">
              <p>{getEmptyMessage()}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Section;
