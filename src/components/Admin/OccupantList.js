import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { occupantAPI, tenantAPI } from '../../services/api';
import Header from '../Header';

function OccupantList() {
    const navigate = useNavigate();
    const [occupants, setOccupants] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [occupantsData, tenantsData] = await Promise.all([
                occupantAPI.getAll(),
                tenantAPI.getAll()
            ]);
            setOccupants(occupantsData);
            setTenants(tenantsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this occupant?')) {
            try {
                await occupantAPI.delete(id);
                alert('Occupant deleted successfully!');
                fetchData();
            } catch (error) {
                console.error('Error deleting occupant:', error);
                alert('Error deleting occupant');
            }
        }
    };

    const getTenantName = (tenantId) => {
        const tenant = tenants.find(t => t.id === tenantId);
        return tenant ? tenant.full_name : 'Unknown';
    };

    const filteredOccupants = occupants.filter(occ => 
        occ.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        occ.relationship?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTenantName(occ.tenant_id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#2c3e50'
    };

    const addButtonStyle = {
        padding: '12px 24px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s'
    };

    const searchBarStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px'
    };

    const searchInputStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const statsStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    };

    const statCardStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
    };

    const statNumberStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '8px'
    };

    const statLabelStyle = {
        fontSize: '14px',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    };

    const tableContainerStyle = {
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        background: '#667eea',
        color: 'white',
        padding: '16px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '14px',
        textTransform: 'uppercase'
    };

    const tdStyle = {
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '14px',
        color: '#2c3e50'
    };

    const actionButtonStyle = (color) => ({
        padding: '6px 12px',
        margin: '0 4px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: color,
        color: 'white',
        transition: 'opacity 0.2s'
    });

    const relationshipBadgeStyle = {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        background: '#e3f2fd',
        color: '#1976d2'
    };

    const stats = {
        total: occupants.length,
        children: occupants.filter(o => o.relationship?.toLowerCase() === 'child' || o.age < 18).length,
        adults: occupants.filter(o => o.age >= 18).length
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading occupants...')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, '👨‍👩‍👧‍👦 Occupants'),
                React.createElement('button', {
                    style: addButtonStyle,
                    onClick: () => navigate('/admin/occupants/add'),
                    onMouseEnter: (e) => e.target.style.background = '#5568d3',
                    onMouseLeave: (e) => e.target.style.background = '#667eea'
                }, '+ Add New Occupant')
            ),

            React.createElement('div', { style: statsStyle },
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.total),
                    React.createElement('div', { style: statLabelStyle }, '👥 Total Occupants')
                ),
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.adults),
                    React.createElement('div', { style: statLabelStyle }, '👨 Adults')
                ),
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.children),
                    React.createElement('div', { style: statLabelStyle }, '👶 Children')
                )
            ),

            React.createElement('div', { style: searchBarStyle },
                React.createElement('input', {
                    type: 'text',
                    placeholder: '🔍 Search by name, relationship, or tenant...',
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    style: searchInputStyle
                })
            ),

            filteredOccupants.length === 0 
                ? React.createElement('div', { 
                    style: { 
                        background: 'white', 
                        padding: '40px', 
                        textAlign: 'center', 
                        borderRadius: '12px' 
                    } 
                },
                    React.createElement('p', { style: { fontSize: '18px', color: '#95a5a6' } }, 
                        '📭 No occupants found'
                    )
                )
                : React.createElement('div', { style: tableContainerStyle },
                    React.createElement('table', { style: tableStyle },
                        React.createElement('thead', null,
                            React.createElement('tr', null,
                                React.createElement('th', { style: thStyle }, 'Name'),
                                React.createElement('th', { style: thStyle }, 'Tenant'),
                                React.createElement('th', { style: thStyle }, 'Relationship'),
                                React.createElement('th', { style: thStyle }, 'Age'),
                                React.createElement('th', { style: thStyle }, 'Phone'),
                                React.createElement('th', { style: thStyle }, 'Actions')
                            )
                        ),
                        React.createElement('tbody', null,
                            filteredOccupants.map((occupant, index) => 
                                React.createElement('tr', {
                                    key: occupant.id,
                                    style: { 
                                        background: index % 2 === 0 ? 'white' : '#f8f9fa',
                                        transition: 'background 0.2s'
                                    },
                                    onMouseEnter: (e) => e.currentTarget.style.background = '#e3f2fd',
                                    onMouseLeave: (e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#f8f9fa'
                                },
                                    React.createElement('td', { style: tdStyle },
                                        React.createElement('strong', null, occupant.full_name)
                                    ),
                                    React.createElement('td', { style: tdStyle }, getTenantName(occupant.tenant_id)),
                                    React.createElement('td', { style: tdStyle },
                                        React.createElement('span', { style: relationshipBadgeStyle },
                                            occupant.relationship || 'N/A'
                                        )
                                    ),
                                    React.createElement('td', { style: tdStyle }, occupant.age || 'N/A'),
                                    React.createElement('td', { style: tdStyle }, occupant.phone || 'N/A'),
                                    React.createElement('td', { style: tdStyle },
                                        React.createElement('button', {
                                            style: actionButtonStyle('#667eea'),
                                            onClick: () => navigate(`/admin/occupants/edit/${occupant.id}`),
                                            onMouseEnter: (e) => e.target.style.opacity = '0.8',
                                            onMouseLeave: (e) => e.target.style.opacity = '1'
                                        }, '✏️ Edit'),
                                        React.createElement('button', {
                                            style: actionButtonStyle('#e74c3c'),
                                            onClick: () => handleDelete(occupant.id),
                                            onMouseEnter: (e) => e.target.style.opacity = '0.8',
                                            onMouseLeave: (e) => e.target.style.opacity = '1'
                                        }, '🗑️ Delete')
                                    )
                                )
                            )
                        )
                    )
                )
        )
    );
}

export default OccupantList;
