import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../../services/api';

function TenantList() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        try {
            const data = await tenantAPI.getAll();
            setTenants(data);
        } catch (error) {
            console.error('Error fetching tenants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tenant?')) {
            try {
                await tenantAPI.delete(id);
                fetchTenants();
            } catch (error) {
                console.error('Error deleting tenant:', error);
                alert('Failed to delete tenant');
            }
        }
    };

    // Filter and search logic
    const filteredTenants = tenants.filter(tenant => {
        const matchesSearch = 
            tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.phone?.includes(searchTerm);

        const matchesStatus = 
            filterStatus === 'all' || 
            tenant.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const containerStyle = {
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#2c3e50'
    };

    const searchBarStyle = {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    };

    const searchInputStyle = {
        flex: '1',
        minWidth: '250px',
        padding: '12px 16px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px'
    };

    const selectStyle = {
        padding: '12px 16px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
        minWidth: '150px'
    };

    const buttonStyle = {
        padding: '12px 24px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    const resultCountStyle = {
        fontSize: '14px',
        color: '#7f8c8d',
        marginBottom: '15px'
    };

    const tableStyle = {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const thStyle = {
        padding: '16px',
        textAlign: 'left',
        borderBottom: '2px solid #e0e0e0',
        fontWeight: 'bold',
        color: '#2c3e50',
        backgroundColor: '#f8f9fa'
    };

    const tdStyle = {
        padding: '16px',
        borderBottom: '1px solid #f0f0f0'
    };

    const actionButtonStyle = {
        padding: '8px 16px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px'
    };

    const editButtonStyle = {
        ...actionButtonStyle,
        background: '#3498db',
        color: 'white'
    };

    const deleteButtonStyle = {
        ...actionButtonStyle,
        background: '#e74c3c',
        color: 'white'
    };

    const viewButtonStyle = {
        ...actionButtonStyle,
        background: '#2ecc71',
        color: 'white'
    };

    const statusBadgeStyle = (status) => ({
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        backgroundColor: status === 'active' ? '#d4edda' : '#f8d7da',
        color: status === 'active' ? '#155724' : '#721c24'
    });

    if (loading) {
        return React.createElement('div', { style: containerStyle }, 'Loading...');
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement('div', { style: headerStyle },
            React.createElement('h1', { style: titleStyle }, 'Tenant Management'),
            React.createElement('button', {
                style: buttonStyle,
                onClick: () => navigate('/admin/tenants/add'),
                onMouseEnter: (e) => e.target.style.background = '#5568d3',
                onMouseLeave: (e) => e.target.style.background = '#667eea'
            }, '+ Add New Tenant')
        ),

        React.createElement('div', { style: searchBarStyle },
            React.createElement('input', {
                type: 'text',
                placeholder: '🔍 Search by name, email, or phone...',
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                style: searchInputStyle
            }),
            React.createElement('select', {
                value: filterStatus,
                onChange: (e) => setFilterStatus(e.target.value),
                style: selectStyle
            },
                React.createElement('option', { value: 'all' }, 'All Status'),
                React.createElement('option', { value: 'active' }, 'Active'),
                React.createElement('option', { value: 'inactive' }, 'Inactive')
            ),
            searchTerm && React.createElement('button', {
                onClick: () => setSearchTerm(''),
                style: { ...buttonStyle, background: '#95a5a6' }
            }, 'Clear Search')
        ),

        React.createElement('div', { style: resultCountStyle },
            `Showing ${filteredTenants.length} of ${tenants.length} tenants`
        ),

        filteredTenants.length === 0 ? (
            React.createElement('div', { 
                style: { 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#7f8c8d',
                    background: 'white',
                    borderRadius: '12px'
                } 
            }, 
                searchTerm ? 
                    `No tenants found matching "${searchTerm}"` : 
                    'No tenants found. Click "Add New Tenant" to create one.'
            )
        ) : (
            React.createElement('table', { style: tableStyle },
                React.createElement('thead', null,
                    React.createElement('tr', null,
                        React.createElement('th', { style: thStyle }, 'Name'),
                        React.createElement('th', { style: thStyle }, 'Email'),
                        React.createElement('th', { style: thStyle }, 'Phone'),
                        React.createElement('th', { style: thStyle }, 'Apartment'),
                        React.createElement('th', { style: thStyle }, 'Status'),
                        React.createElement('th', { style: thStyle }, 'Actions')
                    )
                ),
                React.createElement('tbody', null,
                    filteredTenants.map(tenant =>
                        React.createElement('tr', { key: tenant.id },
                            React.createElement('td', { style: tdStyle }, tenant.name),
                            React.createElement('td', { style: tdStyle }, tenant.email),
                            React.createElement('td', { style: tdStyle }, tenant.phone),
                            React.createElement('td', { style: tdStyle }, tenant.apartment_number || 'Not Assigned'),
                            React.createElement('td', { style: tdStyle },
                                React.createElement('span', {
                                    style: statusBadgeStyle(tenant.status)
                                }, tenant.status === 'active' ? 'Active' : 'Inactive')
                            ),
                            React.createElement('td', { style: tdStyle },
                                React.createElement('button', {
                                    style: viewButtonStyle,
                                    onClick: () => navigate(`/admin/tenants/${tenant.id}`),
                                    onMouseEnter: (e) => e.target.style.background = '#27ae60',
                                    onMouseLeave: (e) => e.target.style.background = '#2ecc71'
                                }, 'View'),
                                React.createElement('button', {
                                    style: editButtonStyle,
                                    onClick: () => navigate(`/admin/tenants/edit/${tenant.id}`),
                                    onMouseEnter: (e) => e.target.style.background = '#2980b9',
                                    onMouseLeave: (e) => e.target.style.background = '#3498db'
                                }, 'Edit'),
                                React.createElement('button', {
                                    style: deleteButtonStyle,
                                    onClick: () => handleDelete(tenant.id),
                                    onMouseEnter: (e) => e.target.style.background = '#c0392b',
                                    onMouseLeave: (e) => e.target.style.background = '#e74c3c'
                                }, 'Delete')
                            )
                        )
                    )
                )
            )
        )
    );
}

export default TenantList;
