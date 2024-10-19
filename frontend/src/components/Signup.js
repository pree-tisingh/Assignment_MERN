import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createUser({ username, password, email })).unwrap();
            setShowPopup(true); 
            setUsername('');
            setPassword('');
            setEmail('');
        
            setTimeout(() => {
                navigate('/'); 
            }, 1000); 
        } catch (error) {
            console.error('Failed to register: ', error);
            
        }
    };

    return (
        <div className="signup-container">
            <div className="left-side"></div> 
            <div className="right-side">
                {showPopup && <div className="popup">Registration Successful!</div>} 
                <h2 style={{ fontSize: '22px'}}>Get Started Today</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p style={{ fontSize: '12px', color: '#007bff' }}>
                    Already have an account?{' '}
                    <a href="/" >Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
