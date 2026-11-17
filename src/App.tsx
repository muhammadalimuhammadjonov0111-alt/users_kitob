import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Section, { type Book } from "./components/Section";
import Fotter from "./components/Fotter";


const API_URL = "https://6af6d476e844c7ff741baf8f.mockapi.io/books";


function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "purchased">(
    "all"
  );

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("mutolaa_favs");
    return saved ? JSON.parse(saved) : [];
  });

  const [purchased, setPurchased] = useState<string[]>(() => {
    const saved = localStorage.getItem("mutolaa_purchased");
    return saved ? JSON.parse(saved) : [];
  });

  const categories = [
    "Barchasi",
    "Roman",
    "Tarixiy",
    "Qissa",
    "Hikoyalar",
    "Falsafiy",
  ];

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const uniqueBooks = data.map((item, index) => ({
            ...item,
            id: `${item.title}-${index}`,
          }));
          setBooks(uniqueBooks);
        } else {
          setBooks([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("mutolaa_favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("mutolaa_purchased", JSON.stringify(purchased));
  }, [purchased]);

  const toggleFavorite = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((item) => item !== bookId)
        : [...prev, bookId]
    );
  };

  const handlePurchase = (book: Book) => {
    const isAlreadyPurchased = purchased.includes(book.id);

    if (isAlreadyPurchased) {
      const updated = purchased.filter((id) => id !== book.id);
      setPurchased(updated);
      alert(`"${book.title}" xaridlar ro‘yxatidan olib tashlandi.`);
    } else {
      setPurchased((prev) => [...prev, book.id]);
      alert(`"${book.title}" xarid qilindi!`);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Barchasi" || book.category === selectedCategory;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && favorites.includes(book.id)) ||
      (activeTab === "purchased" && purchased.includes(book.id));

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="app-wrapper">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        purchasedCount={purchased.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Section
        books={filteredBooks}
        loading={loading}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        purchased={purchased}
        handlePurchase={handlePurchase}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        activeTab={activeTab}
      />

      <Fotter />
    </div>
  );
}

export default App;
