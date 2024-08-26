import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, getUserById, fetchUsers } from 'src/services/api';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
    const [sessionUser, setSessionUser] = useState(null); // Store selected user data when not logged in
    const [users, setUsers] = useState([]); // Store list of users for selection
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
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
        } else {
            fetchUsersData(); // Fetch users data if not logged in
        }
        setLoading(false);
    }, [token]);

    const fetchUsersData = async () => {
        try {
            const allUsers = await fetchUsers();
            setUsers(allUsers.data);

            // Select the first user by default if not logged in
            if (allUsers.data.length > 0) {
                const firstUserId = allUsers.data[0]._id;
                setSelectedUserId(firstUserId);
                const firstUserData = await getUserById(firstUserId);
                setSessionUser(firstUserData?.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const data = await loginApi(email, password);
            const token = data?.data?.token;
            setData(data);
            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(jwtDecode(token));
            setToken(token);
            navigate('/apps/chats');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
        setSelectedUserId(null); // Reset selected user ID on logout
        setSessionUser(null); // Reset session user data on logout
        setUsers([]); // Clear users list on logout
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                data,
                token,
                selectedUserId,
                setSelectedUserId,
                sessionUser,
                users,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
