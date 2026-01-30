import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apartmentAPI } from '../../services/api';
import Header from '../Header';

function ApartmentList() {
    const navigate = useNavigate();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchApartments();
    }, []);

    const fetchApartments = async () => {
        try {
            const data = await apartmentAPI.getAll();
            setApartments(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching apartments:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this apartment?')) {
            try {
                await apartmentAPI.delete(id);
                alert('Apartment deleted successfully!');
                fetchApartments();
            } catch (error) {
                console.error('Error deleting apartment:', error);
                alert('Error deleting apartment');
            }
        }
    };

    const filteredApartments = apartments.filter(apt => {
        const matchesSearch = apt.apartment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            apt.floor.toString().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

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

    const filterBarStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
    };

    const searchInputStyle = {
        flex: 1,
        minWidth: '250px',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px'
    };

    const selectStyle = {
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
    };

    const apartmentNumberStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '12px'
    };

    const detailRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #f0f0f0'
    };

    const labelStyle = {
        color: '#7f8c8d',
        fontSize: '14px'
    };

    const valueStyle = {
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const badgeStyle = (status) => ({
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        background: status === 'available' ? '#d4edda' : '#f8d7da',
        color: status === 'available' ? '#155724' : '#721c24'
    });

    const buttonGroupStyle = {
        display: 'flex',
        gap: '8px',
        marginTop: '16px'
    };

    const actionButtonStyle = (color) => ({
        flex: 1,
        padding: '8px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        background: color,
        color: 'white',
        transition: 'opacity 0.2s'
    });

    const statsStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    };

    const statCardStyle = {
        background: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
    };

    const statNumberStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '4px'
    };

    const statLabelStyle = {
        fontSize: '12px',
        color: '#7f8c8d',
        textTransform: 'uppercase'
    };

    const stats = {
        total: apartments.length,
        occupied: apartments.filter(a => a.status === 'occupied').length,
        available: apartments.filter(a => a.status === 'available').length
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading apartments...')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, '🏢 Apartments'),
                React.createElement('button', {
                    style: addButtonStyle,
                    onClick: () => navigate('/admin/apartments/add'),
                    onMouseEnter: (e) => e.target.style.background = '#5568d3',
                    onMouseLeave: (e) => e.target.style.background = '#667eea'
                }, '+ Add New Apartment')
            ),

            React.createElement('div', { style: statsStyle },
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.total),
                    React.createElement('div', { style: statLabelStyle }, 'Total Apartments')
                ),
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.occupied),
                    React.createElement('div', { style: statLabelStyle }, 'Occupied')
                ),
                React.createElement('div', { style: statCardStyle },
                    React.createElement('div', { style: statNumberStyle }, stats.available),
                    React.createElement('div', { style: statLabelStyle }, 'Available')
                )
            ),

            React.createElement('div', { style: filterBarStyle },
                React.createElement('input', {
                    type: 'text',
                    placeholder: '🔍 Search by apartment number or floor...',
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
                    React.createElement('option', { value: 'available' }, 'Available'),
                    React.createElement('option', { value: 'occupied' }, 'Occupied')
                )
            ),

            filteredApartments.length === 0 
                ? React.createElement('div', { 
                    style: { 
                        background: 'white', 
                        padding: '40px', 
                        textAlign: 'center', 
                        borderRadius: '12px' 
                    } 
                },
                    React.createElement('p', { style: { fontSize: '18px', color: '#95a5a6' } }, 
                        '📭 No apartments found'
                    )
                )
                : React.createElement('div', { style: gridStyle },
                    filteredApartments.map(apartment => 
                        React.createElement('div', {
                            key: apartment.id,
                            style: cardStyle,
                            onMouseEnter: (e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }
                        },
                            React.createElement('div', { style: apartmentNumberStyle }, 
                                `Apartment ${apartment.apartment_number}`
                            ),
                            
                            React.createElement('div', { style: detailRowStyle },
                                React.createElement('span', { style: labelStyle }, 'Floor:'),
                                React.createElement('span', { style: valueStyle }, apartment.floor)
                            ),
                            
                            React.createElement('div', { style: detailRowStyle },
                                React.createElement('span', { style: labelStyle }, 'Bedrooms:'),
                                React.createElement('span', { style: valueStyle }, apartment.bedrooms || 'N/A')
                            ),
                            
                            React.createElement('div', { style: detailRowStyle },
                                React.createElement('span', { style: labelStyle }, 'Bathrooms:'),
                                React.createElement('span', { style: valueStyle }, apartment.bathrooms || 'N/A')
                            ),
                            
                            React.createElement('div', { style: detailRowStyle },
                                React.createElement('span', { style: labelStyle }, 'Rent:'),
                                React.createElement('span', { style: valueStyle }, 
                                    apartment.rent_amount ? `₹${apartment.rent_amount}` : 'N/A'
                                )
                            ),
                            
                            React.createElement('div', { style: { marginTop: '12px' } },
                                React.createElement('span', { style: badgeStyle(apartment.status) },
                                    apartment.status.toUpperCase()
                                )
                            ),
                            
                            React.createElement('div', { style: buttonGroupStyle },
                                React.createElement('button', {
                                    style: actionButtonStyle('#667eea'),
                                    onClick: () => navigate(`/admin/apartments/edit/${apartment.id}`),
                                    onMouseEnter: (e) => e.target.style.opacity = '0.8',
                                    onMouseLeave: (e) => e.target.style.opacity = '1'
                                }, '✏️ Edit'),
                                
                                React.createElement('button', {
                                    style: actionButtonStyle('#e74c3c'),
                                    onClick: () => handleDelete(apartment.id),
                                    onMouseEnter: (e) => e.target.style.opacity = '0.8',
                                    onMouseLeave: (e) => e.target.style.opacity = '1'
                                }, '🗑️ Delete')
                            )
                        )
                    )
                )
        )
    );
}

export default ApartmentList;
