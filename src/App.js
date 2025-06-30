import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OrdersPage from './pages/OrdersPage';
import API from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>📚 The Book Nook</h1>
        {!isLoggedIn ? (
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <>
            <nav style={{ marginBottom: '1rem' }}>
              <Link to="/">🏠 Home</Link> |{' '}
              <Link to="/orders">🧾 My Orders</Link> |{' '}
              <button onClick={handleLogout}>Logout</button>
            </nav>
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

// Move BookList into a component
function BookList() {
  const [books, setBooks] = useState([]);

  React.useEffect(() => {
    API.get('/books/')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
