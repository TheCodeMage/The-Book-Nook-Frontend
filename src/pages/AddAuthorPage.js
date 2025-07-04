import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddAuthorPage() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post('/authors/', { name })
            .then(() => {
                alert('✅ Author added!');
                navigate('/add-book');  // return to book form
            })
            .catch(() => alert('❌ Failed to add author'));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>✏️ Add New Author</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Author name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">➕ Add</button>
            </form>
        </div>
    );
}

export default AddAuthorPage;
