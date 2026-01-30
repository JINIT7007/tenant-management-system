import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apartmentAPI, tenantAPI } from '../../services/api';
import Header from '../Header';

function ApartmentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [apartment, setApartment] = useState(null);
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApartmentDetails();
    }, []);

    const fetchApartmentDetails = async () => {
        try {
            const aptData = await apartmentAPI.getById(id);
            setApartment(aptData);

            // If apartment is occupied, fetch tenant details
            if (aptData.status === 'occupied') {
                const allTenants = await tenantAPI.getAll();
                const currentTenant = allTenants.find(t => t.apartment_id === aptData.id);
                if (currentTenant) {
                    const tenantDetails = await tenantAPI.getDetails(currentTenant.id);
                    setTenant(tenantDetails);
                }
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching apartment details:', error);
            alert('Failed to load apartment details');
            navigate('/admin/apartments');
        }
    };

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px'
    };

    const backButtonStyle = {
        padding: '10px 20px',
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '20px'
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

    const buttonStyle = {
        padding: '12px 24px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        marginRight: '12px'
    };

    const cardStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px'
    };

    const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '20px',
        borderBottom: '2px solid #667eea',
        paddingBottom: '10px'
    };

    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
    };

    const infoItemStyle = {
        marginBottom: '16px'
    };

    const labelStyle = {
        fontSize: '12px',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '6px',
        fontWeight: 'bold'
    };

    const valueStyle = {
        fontSize: '16px',
        color: '#2c3e50',
        fontWeight: '500'
    };

    const statusAvailableStyle = {
        display: 'inline-block',
        padding: '6px 16px',
        background: '#d4edda',
        color: '#155724',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const statusOccupiedStyle = {
        display: 'inline-block',
        padding: '6px 16px',
        background: '#fff3cd',
        color: '#856404',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '40px',
        color: '#95a5a6',
        fontSize: '16px'
    };

    const tenantCardStyle = {
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '16px'
    };

    const tenantNameStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '10px'
    };

    const tenantInfoStyle = {
        fontSize: '14px',
        color: '#555',
        marginBottom: '6px'
    };

    const viewTenantLinkStyle = {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px'
    };

    const occupantsListStyle = {
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid #e0e0e0'
    };

    const occupantItemStyle = {
        padding: '12px',
        background: 'white',
        borderRadius: '6px',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#2c3e50'
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading apartment details...')
            )
        );
    }

    if (!apartment) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Apartment not found')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('button', { 
                style: backButtonStyle,
                onClick: () => navigate('/admin/apartments')
            }, '← Back to Apartments'),

            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, 
                    `🏢 Apartment ${apartment.apartment_number}`
                ),
                React.createElement('div', null,
                    React.createElement('button', { 
                        style: buttonStyle,
                        onClick: () => navigate(`/admin/edit-apartment/${apartment.id}`)
                    }, 'Edit Apartment'),
                    apartment.status !== 'occupied' && React.createElement('button', { 
                        style: { ...buttonStyle, background: '#e74c3c' },
                        onClick: async () => {
                            if (window.confirm('Are you sure you want to delete this apartment?')) {
                                try {
                                    await apartmentAPI.delete(apartment.id);
                                    alert('Apartment deleted successfully');
                                    navigate('/admin/apartments');
                                } catch (error) {
                                    alert('Failed to delete apartment');
                                }
                            }
                        }
                    }, 'Delete')
                )
            ),

            // Apartment Information Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, '🏢 Apartment Information'),
                React.createElement('div', { style: infoGridStyle },
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Apartment Number'),
                        React.createElement('div', { style: valueStyle }, apartment.apartment_number)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Floor'),
                        React.createElement('div', { style: valueStyle }, apartment.floor)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Bedrooms'),
                        React.createElement('div', { style: valueStyle }, apartment.bedrooms)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Bathrooms'),
                        React.createElement('div', { style: valueStyle }, apartment.bathrooms)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Monthly Rent'),
                        React.createElement('div', { style: valueStyle }, `$${apartment.rent}`)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Status'),
                        React.createElement('div', null,
                            React.createElement('span', { 
                                style: apartment.status === 'available' ? statusAvailableStyle : statusOccupiedStyle 
                            }, apartment.status.toUpperCase())
                        )
                    )
                )
            ),

            // Current Tenant Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, 
                    apartment.status === 'occupied' ? '👤 Current Tenant' : '👤 Tenant Information'
                ),
                apartment.status === 'occupied' && tenant
                    ? React.createElement('div', { style: tenantCardStyle },
                        React.createElement('div', { style: tenantNameStyle }, tenant.full_name),
                        React.createElement('div', { style: tenantInfoStyle },
                            React.createElement('strong', null, '📧 Email: '),
                            tenant.email
                        ),
                        React.createElement('div', { style: tenantInfoStyle },
                            React.createElement('strong', null, '📱 Phone: '),
                            tenant.phone
                        ),
                        tenant.occupation && React.createElement('div', { style: tenantInfoStyle },
                            React.createElement('strong', null, '💼 Occupation: '),
                            tenant.occupation
                        ),
                        tenant.move_in_date && React.createElement('div', { style: tenantInfoStyle },
                            React.createElement('strong', null, '📅 Move-in Date: '),
                            new Date(tenant.move_in_date).toLocaleDateString()
                        ),
                        React.createElement('div', { style: { marginTop: '12px' } },
                            React.createElement('span', {
                                style: viewTenantLinkStyle,
                                onClick: () => navigate(`/admin/tenant-details/${tenant.id}`)
                            }, '👁️ View Full Tenant Details →')
                        ),

                        // Household Members Section
                        tenant.occupants && tenant.occupants.length > 0 && React.createElement('div', { style: occupantsListStyle },
                            React.createElement('div', { style: { ...labelStyle, marginBottom: '12px' } }, 
                                `Household Members (${tenant.occupants.length})`
                            ),
                            tenant.occupants.map(occupant =>
                                React.createElement('div', { key: occupant.id, style: occupantItemStyle },
                                    React.createElement('strong', null, occupant.name),
                                    ` - ${occupant.relationship}, Age ${occupant.age}`,
                                    occupant.phone && ` | ${occupant.phone}`
                                )
                            )
                        )
                    )
                    : React.createElement('div', { style: emptyStateStyle },
                        React.createElement('h3', { style: { marginBottom: '10px' } }, '✨ Apartment Available'),
                        React.createElement('p', null, 'This apartment is currently vacant and ready for a new tenant.')
                    )
            ),

            // Quick Stats Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, '📊 Quick Stats'),
                React.createElement('div', { style: infoGridStyle },
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Size'),
                        React.createElement('div', { style: valueStyle }, 
                            `${apartment.bedrooms} Bed / ${apartment.bathrooms} Bath`
                        )
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Location'),
                        React.createElement('div', { style: valueStyle }, `Floor ${apartment.floor}`)
                    ),
                    apartment.status === 'occupied' && tenant && React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Total Residents'),
                        React.createElement('div', { style: valueStyle }, 
                            tenant.occupants ? tenant.occupants.length + 1 : 1
                        )
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Rent Per Month'),
                        React.createElement('div', { style: valueStyle }, `$${apartment.rent}`)
                    )
                )
            )
        )
    );
}

export default ApartmentDetails;
