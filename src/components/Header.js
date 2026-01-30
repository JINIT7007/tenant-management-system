import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px 40px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };

    const brandStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    const navStyle = {
        display: 'flex',
        gap: '24px',
        alignItems: 'center'
    };

    const linkStyle = (isActive) => ({
        color: 'white',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
        fontWeight: isActive ? 'bold' : 'normal'
    });

    const buttonStyle = {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s'
    };

    return React.createElement('div', { style: headerStyle },
        React.createElement('div', { 
            style: brandStyle,
            onClick: () => navigate('/admin/dashboard')
        }, '🏢 TenantHub'),
        
        React.createElement('div', { style: navStyle },
            React.createElement('div', { 
                style: linkStyle(location.pathname.includes('/dashboard')),
                onClick: () => navigate('/admin/dashboard')
            }, 'Dashboard'),
            
            React.createElement('div', { 
                style: linkStyle(location.pathname.includes('/tenants')),
                onClick: () => navigate('/admin/tenants')
            }, 'Tenants'),
            
            React.createElement('div', { 
                style: linkStyle(location.pathname.includes('/apartments')),
                onClick: () => navigate('/admin/apartments')
            }, 'Apartments'),
            
            React.createElement('div', { 
                style: linkStyle(location.pathname.includes('/occupants')),
                onClick: () => navigate('/admin/occupants')
            }, 'Occupants'),
            
            React.createElement('button', { 
                style: buttonStyle,
                onClick: handleLogout,
                onMouseEnter: (e) => e.target.style.background = 'rgba(255,255,255,0.3)',
                onMouseLeave: (e) => e.target.style.background = 'rgba(255,255,255,0.2)'
            }, 'Logout')
        )
    );
}

export default Header;
