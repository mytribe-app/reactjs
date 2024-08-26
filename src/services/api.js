import axios from 'axios';

const API_URL =
    'https://bd1befe3-dba7-4833-90c4-82cba41e62b0-00-3nvfzfyx3n420.pike.replit.dev:3000/api';

// Auth Endpoints
export const register = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

// User Endpoints
export const getUsers = () => {
    return axios.get(`${API_URL}/users`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const getUserById = (id) => {
    return axios.get(`${API_URL}/users/${id}`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/users/${id}`, userData, {
        withCredentials: true, // Include credentials if needed
    });
};

export const deleteUser = (id) => {
    return axios.delete(`${API_URL}/users/${id}`, {
        withCredentials: true, // Include credentials if needed
    });
};

// Contact Endpoints
export const createContact = (contactData) => {
    return axios.post(`${API_URL}/contacts`, contactData, {
        withCredentials: true, // Include credentials if needed
    });
};

export const getAllContacts = () => {
    return axios.get(`${API_URL}/contacts`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const getContactById = (id) => {
    return axios.get(`${API_URL}/contacts/${id}`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const updateContact = (id, contactData) => {
    return axios.put(`${API_URL}/contacts/${id}`, contactData, {
        withCredentials: true, // Include credentials if needed
    });
};

export const deleteContact = (id) => {
    return axios.delete(`${API_URL}/contacts/${id}`, {
        withCredentials: true, // Include credentials if needed
    });
};

// Post Endpoints
export const createPost = (postData) => {
    return axios.post(`${API_URL}/posts`, postData, {
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

export const updatePost = (id, postData) => {
    return axios.put(`${API_URL}/posts/${id}`, postData, {
        withCredentials: true, // Include credentials if needed
    });
};

export const deletePost = (id) => {
    return axios.delete(`${API_URL}/posts/${id}`, {
        withCredentials: true, // Include if needed
    });
};

// Comment Endpoints
export const createComment = (commentData) => {
    return axios.post(`${API_URL}/comments`, commentData, {
        withCredentials: true, // Include credentials if needed
    });
};

export const getCommentsByPostId = (postId) => {
    return axios.get(`${API_URL}/comments/post/${postId}`, {
        withCredentials: true, // Include credentials if needed
    });
};

export const fetchUsers = () => {
    return axios.get(`${API_URL}/users`);
};

// Fetch a single user by ID
export const fetchUserById = (id) => {
    return axios.get(`${API_URL}/users/${id}`);
};

// Fetch all posts
export const fetchAllPosts = () => {
    return axios.get(`${API_URL}/posts`);
};

// Fetch a single post by ID
export const fetchPostById = (id) => {
    return axios.get(`${API_URL}/posts/${id}`);
};

// Fetch all contacts
export const fetchAllContacts = () => {
    return axios.get(`${API_URL}/contacts`);
};

// Fetch a single contact by ID
export const fetchContactById = (id) => {
    return axios.get(`${API_URL}/contacts/${id}`);
};

// Fetch comments for a specific post by post ID
export const fetchCommentsByPostId = (postId) => {
    return axios.get(`${API_URL}/comments/${postId}`);
};
