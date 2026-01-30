import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if email is admin@test.com with password admin123
    if (email === 'admin@test.com' && password === 'admin123') {
      localStorage.setItem('token', 'fake-token-123');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'admin@test.com',
        role: 'admin',
        full_name: 'Admin User'
      }));
      navigate('/admin/dashboard');
    } 
    // Check if email is tenant@test.com with password tenant123
    else if (email === 'tenant@test.com' && password === 'tenant123') {
      localStorage.setItem('token', 'fake-token-456');
      localStorage.setItem('user', JSON.stringify({
        id: 2,
        email: 'tenant@test.com',
        role: 'tenant',
        full_name: 'Tenant User'
      }));
      navigate('/tenant/dashboard');
    } 
    else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>TenantHub</h2>
        <p className="subtitle">Login to your account</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
          
          <div className="login-info">
            <p>Demo credentials:</p>
            <p>Admin: admin@test.com / admin123</p>
            <p>Tenant: tenant@test.com / tenant123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
