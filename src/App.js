import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage'; // 🌐 4.5: Add Route to /cart
import API from './services/api';
import { CartProvider, CartContext } from './CartContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <CartProvider>
        <div style={{ padding: '2rem' }}>
          <h1>📚 The Book Nook</h1>
          {!isLoggedIn ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <>
              <nav style={{ marginBottom: '1rem' }}>
                <Link to="/">🏠 Home</Link> |{' '}
                <Link to="/orders">🧾 Orders</Link> |{' '}
                <Link to="/cart">🛍️ Cart</Link> |{' '}
                <button onClick={handleLogout}>Logout</button>
              </nav>
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/cart" element={<CartPage />} /> {/* ✅ Added route */}
              </Routes>
            </>
          )}
        </div>
      </CartProvider>
    </Router>
  );
}

// 🧾 BookList Component with Add to Cart
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
