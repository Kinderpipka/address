import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        
        try {
            const response = await axios.post('http://localhost:8000/api/login', 
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                }
            );
            
            setToken(response.data.token);
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Auth;
