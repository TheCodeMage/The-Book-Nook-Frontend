import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddBookPage() {
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author_id: '',
        description: '',
        price: '',
        stock: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/authors/')
            .then(res => setAuthors(res.data))
            .catch(err => console.error('Author fetch error:', err));
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post('/books/', formData)
            .then(() => {
                alert('📘 Book created!');
                navigate('/');
            })
            .catch(() => alert('❌ Failed to create book'));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>📘 Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" onChange={handleChange} required />
                <select name="author_id" onChange={handleChange} required>
                    <option value="">Select Author</option>
                    {authors.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>
                <textarea name="description" placeholder="Description" onChange={handleChange} />
                <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
                <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
                <button type="submit">➕ Add Book</button>
            </form>
        </div>
    );
}

export default AddBookPage;
