import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function TenantDashboard() {
    const navigate = useNavigate();

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px'
    };

    const titleStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '40px'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
    };

    const cardStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    };

    const cardTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '10px'
    };

    const cardDescStyle = {
        fontSize: '14px',
        color: '#7f8c8d'
    };

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('h1', { style: titleStyle }, 'Tenant Dashboard'),

            React.createElement('div', { style: gridStyle },
                React.createElement('div', { 
                    style: cardStyle,
                    onClick: () => navigate('/tenant/profile'),
                    onMouseEnter: (e) => e.target.style.transform = 'translateY(-4px)',
                    onMouseLeave: (e) => e.target.style.transform = 'translateY(0)'
                },
                    React.createElement('h3', { style: cardTitleStyle }, '👤 My Profile'),
                    React.createElement('p', { style: cardDescStyle }, 'View and edit your personal information')
                ),

                React.createElement('div', { 
                    style: cardStyle,
                    onClick: () => navigate('/tenant/occupants'),
                    onMouseEnter: (e) => e.target.style.transform = 'translateY(-4px)',
                    onMouseLeave: (e) => e.target.style.transform = 'translateY(0)'
                },
                    React.createElement('h3', { style: cardTitleStyle }, '👨‍👩‍👧‍👦 Occupants'),
                    React.createElement('p', { style: cardDescStyle }, 'Manage household members')
                )
            )
        )
    );
}

export default TenantDashboard;
