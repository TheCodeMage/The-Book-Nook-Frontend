// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import AddBookPage from './pages/AddBookPage'; // ✅ New import
import API from './services/api';
import { CartProvider, CartContext } from './CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // ✅ Import CSS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <h1>📚 The Book Nook</h1>
          {!isLoggedIn ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <>
              <nav className="navbar">
                <Link to="/" className="nav-link">🏠 Home</Link>
                <Link to="/orders" className="nav-link">🧾 Orders</Link>
                <Link to="/cart" className="nav-link">🛍️ Cart</Link>
                <Link to="/add-book" className="nav-link">➕ Add Book</Link> {/* ✅ Add Book Link */}
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </nav>
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/orders" element={
                  <ProtectedRoute><OrdersPage /></ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute><CartPage /></ProtectedRoute>
                } />
                <Route path="/add-book" element={
                  <ProtectedRoute><AddBookPage /></ProtectedRoute> // ✅ Add Book Route
                } />
              </Routes>
            </>
          )}
        </div>
      </CartProvider>
    </Router>
  );
}

function BookList() {
  const [books, setBooks] = useState([]);
  const { addToCart } = React.useContext(CartContext);

  useEffect(() => {
    API.get('/books/')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>📘 Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{book.title}</strong> by {book.author.name} - {book.price} Ks
            <button onClick={() => addToCart(book)} style={{ marginLeft: '1rem' }}>
              ➕ Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
