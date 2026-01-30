import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
