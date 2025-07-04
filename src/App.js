import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import AddBookPage from './pages/AddBookPage';
import AddAuthorPage from './pages/AddAuthorPage';
import AdminDashboard from './pages/AdminDashboard'; // ✅ NEW
import API from './services/api';
import { CartProvider, CartContext } from './CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

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
                <Link to="/add-book" className="nav-link">➕ Add Book</Link>
                <Link to="/add-author" className="nav-link">✏️ Add Author</Link>
                <Link to="/admin" className="nav-link">📊 Admin</Link> {/* ✅ NEW */}
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
                  <ProtectedRoute><AddBookPage /></ProtectedRoute>
                } />
                <Route path="/add-author" element={
                  <ProtectedRoute><AddAuthorPage /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute><AdminDashboard /></ProtectedRoute> // ✅ NEW
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
  const [search, setSearch] = useState('');
  const { addToCart } = React.useContext(CartContext);

  useEffect(() => {
    API.get('/books/')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Book fetch error:', err));
  }, []);

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>📘 Book List</h2>
      <input
        placeholder="Search books..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <ul>
        {filtered.map(book => (
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
