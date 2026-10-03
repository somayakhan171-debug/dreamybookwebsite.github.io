import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components & Pages Import
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('book_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('book_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.some((item) => item.key === book.key);
      if (exists) {
        return prevFavs.filter((item) => item.key !== book.key);
      } else {
        return [...prevFavs, book];
      }
    });
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <NavigationBar favoriteCount={favorites.length} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/books"
              element={
                <Books
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  setBookDetails={setSelectedBook}
                />
              }
            />
            <Route
              path="/book-details"
              element={
                <BookDetails
                  book={selectedBook}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  setBookDetails={setSelectedBook}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <Container>
            <small>&copy; 2026 BookFinder Institute Project. All Rights Reserved.</small>
          </Container>
        </footer>
      </div>
    </Router>
  );
}