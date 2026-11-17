function Fotter() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <div className="logo-badge light">M</div>
            <span className="logo-text light">
              Mutolaa<span className="logo-accent">Hub</span>
            </span>
          </div>
          <p className="footer-desc">
            Zamonaviy elektron kutubxona platformasi. Kitobxonlik madaniyatini
            rivojlantirish va bilimga oson yo‘l ochish uchun yaratilgan.
          </p>
        </div>

        <div className="footer-links">
          <h4>Bo‘limlar</h4>
          <ul>
            <li>Barcha kitoblar</li>
            <li>Badiiy adabiyotlar</li>
            <li>Tarixiy asarlar</li>
            <li>Falsafiy kitoblar</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Aloqa va Manzil</h4>
          <p>Toshkent shahri, Amir Temur shoh ko‘chasi</p>
          <p>Ish vaqti: 09:00 – 20:00</p>
          <p>Telefon: +998 (00) 200-00-00</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MutolaaHub. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
}

export default Fotter;
