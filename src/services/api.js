import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    }
};

export const tenantAPI = {
    getAll: async () => {
        const response = await api.get('/tenants');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/tenants', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/tenants/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/tenants/${id}`);
        return response.data;
    }
};

export const apartmentAPI = {
    getAll: async () => {
        const response = await api.get('/apartments');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/apartments', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/apartments/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/apartments/${id}`);
        return response.data;
    }
};

export const occupantAPI = {
    getAll: async () => {
        const response = await api.get('/occupants');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/occupants', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/occupants/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/occupants/${id}`);
        return response.data;
    }
};

export default api;
