import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/token/`, {
            username,
            password
        })
            .then(res => {
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                onLogin();  // notify parent
            })
            .catch(() => alert('Invalid credentials!'));
    };

    return (
        <form onSubmit={handleLogin} style={{ padding: '1rem' }}>
            <h2>🔐 Login</h2>
            <div>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
            </div>
            <div>
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
