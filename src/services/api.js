import axios from 'axios';

const API_URL = 'https://bd1befe3-dba7-4833-90c4-82cba41e62b0-00-3nvfzfyx3n420.pike.replit.dev:3000/api';

// Auth Endpoints
export const register = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

// User Endpoints
export const getUsers = (token) => {
    return axios.get(`${API_URL}/users`, {
        headers: {
            'x-auth-token': token, // Ensure the token is sent in the request
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const getUserById = (id, token) => {
    return axios.get(`${API_URL}/users/${id}`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const updateUser = (id, userData, token) => {
    return axios.put(`${API_URL}/users/${id}`, userData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const deleteUser = (id, token) => {
    return axios.delete(`${API_URL}/users/${id}`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

// Contact Endpoints
export const createContact = (contactData, token) => {
    return axios.post(`${API_URL}/contacts`, contactData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const getAllContacts = (token) => {
    return axios.get(`${API_URL}/contacts`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const getContactById = (id, token) => {
    return axios.get(`${API_URL}/contacts/${id}`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const updateContact = (id, contactData, token) => {
    return axios.put(`${API_URL}/contacts/${id}`, contactData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const deleteContact = (id, token) => {
    return axios.delete(`${API_URL}/contacts/${id}`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

// Post Endpoints
export const createPost = (postData, token) => {
    return axios.post(`${API_URL}/posts`, postData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const getAllPosts = () => {
    return axios.get(`${API_URL}/posts`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const getPostById = (id) => {
    return axios.get(`${API_URL}/posts/${id}`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const updatePost = (id, postData, token) => {
    return axios.put(`${API_URL}/posts/${id}`, postData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const deletePost = (id, token) => {
    return axios.delete(`${API_URL}/posts/${id}`, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

// Comment Endpoints
export const createComment = (commentData, token) => {
    return axios.post(`${API_URL}/comments`, commentData, {
        headers: {
            'x-auth-token': token,
        },
        withCredentials: true, // Include credentials if needed
    });
};

export const getCommentsByPostId = (postId) => {
    return axios.get(`${API_URL}/comments/post/${postId}`, {
        withCredentials: true, // Include credentials if needed
    });
};
