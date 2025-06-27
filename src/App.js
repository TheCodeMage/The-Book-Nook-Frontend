import React, { useState, useEffect } from 'react';
import API from './services/api';
import LoginForm from './components/LoginForm';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  useEffect(() => {
    if (isLoggedIn) {
      API.get('/books/')
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📚 The Book Nook</h1>
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>Book List</h2>
          <ul>
            {books.map(book => (
              <li key={book.id}>
                <strong>{book.title}</strong> by {book.author.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
