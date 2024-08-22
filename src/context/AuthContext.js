import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi } from 'src/services/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log('token one', token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decodedToken);
                    setToken(token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            const token = data?.data?.token;
            setData(data);
            localStorage.setItem('authToken', data?.data?.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            navigate('/apps/chats');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, data, token }}>
            {children}
        </AuthContext.Provider>
    );
};
