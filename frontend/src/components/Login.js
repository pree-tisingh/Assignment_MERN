import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../store/userSlice';
import '../styles/Login.css'; 

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const response = await dispatch(loginUser({ email, password })).unwrap(); 
            localStorage.setItem('token', response.token); 
            navigate('/home');
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                setError('Invalid email or password'); 
            } else {
                setError('Login failed. Please try again later.'); 
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="left-side"></div> 
            <div className="right-side">
                <h2 style={{ fontSize: '22px'}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>} 
                    <button type="submit">Login</button>
                </form>
                <p style={{ fontSize: '12px', color: '#007bff' }}>
                    Don't have an account? <Link to="/register">Sign up</Link> 
                </p>
            </div>
        </div>
    );
};

export default Login;
