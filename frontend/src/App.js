import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store/store';
import LoginPage from './components/Login';
import RegistrationPage from './components/Signup';
import HomePage from './components/Home';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
