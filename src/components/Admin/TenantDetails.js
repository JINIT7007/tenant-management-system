import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tenantAPI, apartmentAPI } from '../../services/api';
import Header from '../Header';

function TenantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [availableApartments, setAvailableApartments] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState('');

    useEffect(() => {
        fetchTenantDetails();
    }, []);

    const fetchTenantDetails = async () => {
        try {
            const data = await tenantAPI.getDetails(id);
            setTenant(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tenant details:', error);
            alert('Failed to load tenant details');
            navigate('/admin/tenants');
        }
    };

    const fetchAvailableApartments = async () => {
        try {
            const data = await apartmentAPI.getAvailable();
            setAvailableApartments(data);
        } catch (error) {
            console.error('Error fetching available apartments:', error);
        }
    };

    const handleAssignClick = async () => {
        await fetchAvailableApartments();
        setShowAssignModal(true);
        setSelectedApartment('');
    };

    const handleAssignSubmit = async () => {
        if (!selectedApartment && selectedApartment !== 'remove') {
            alert('Please select an apartment');
            return;
        }

        try {
            const apartmentId = selectedApartment === 'remove' ? null : selectedApartment;
            await tenantAPI.assignApartment(id, apartmentId);
            
            alert(apartmentId ? 'Apartment assigned successfully!' : 'Apartment unassigned successfully!');
            setShowAssignModal(false);
            fetchTenantDetails();
        } catch (error) {
            console.error('Error assigning apartment:', error);
            alert('Failed to assign apartment');
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

    const statusActiveStyle = {
        display: 'inline-block',
        padding: '6px 16px',
        background: '#d4edda',
        color: '#155724',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const statusInactiveStyle = {
        display: 'inline-block',
        padding: '6px 16px',
        background: '#f8d7da',
        color: '#721c24',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const occupantsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
    };

    const occupantCardStyle = {
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
    };

    const occupantNameStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '10px'
    };

    const occupantInfoStyle = {
        fontSize: '14px',
        color: '#555',
        marginBottom: '6px'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '40px',
        color: '#95a5a6',
        fontSize: '16px'
    };

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000
    };

    const modalStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '500px',
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    };

    const modalTitleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#2c3e50'
    };

    const formGroupStyle = {
        marginBottom: '20px'
    };

    const labelFormStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#2c3e50'
    };

    const selectStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px'
    };

    const modalButtonsStyle = {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        marginTop: '20px'
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading tenant details...')
            )
        );
    }

    if (!tenant) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Tenant not found')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('button', { 
                style: backButtonStyle,
                onClick: () => navigate('/admin/tenants')
            }, '← Back to Tenants'),

            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, tenant.full_name),
                React.createElement('div', null,
                    React.createElement('button', { 
                        style: { ...buttonStyle, background: '#f39c12' },
                        onClick: handleAssignClick
                    }, tenant.apartment_number ? '🔄 Reassign Apartment' : '📍 Assign Apartment'),
                    React.createElement('button', { 
                        style: buttonStyle,
                        onClick: () => navigate(`/admin/edit-tenant/${tenant.id}`)
                    }, 'Edit Tenant'),
                    React.createElement('button', { 
                        style: { ...buttonStyle, background: '#e74c3c' },
                        onClick: async () => {
                            if (window.confirm('Are you sure you want to deactivate this tenant?')) {
                                try {
                                    await tenantAPI.delete(tenant.id);
                                    alert('Tenant deactivated successfully');
                                    navigate('/admin/tenants');
                                } catch (error) {
                                    alert('Failed to deactivate tenant');
                                }
                            }
                        }
                    }, 'Deactivate')
                )
            ),

            // Personal Information Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, '📋 Personal Information'),
                React.createElement('div', { style: infoGridStyle },
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Full Name'),
                        React.createElement('div', { style: valueStyle }, tenant.full_name)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Email'),
                        React.createElement('div', { style: valueStyle }, tenant.email)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Phone'),
                        React.createElement('div', { style: valueStyle }, tenant.phone)
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Occupation'),
                        React.createElement('div', { style: valueStyle }, tenant.occupation || 'N/A')
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Status'),
                        React.createElement('div', null,
                            React.createElement('span', { 
                                style: tenant.status === 'active' ? statusActiveStyle : statusInactiveStyle 
                            }, tenant.status.toUpperCase())
                        )
                    )
                )
            ),

            // Apartment Information Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, '🏢 Apartment Information'),
                React.createElement('div', { style: infoGridStyle },
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Apartment Number'),
                        React.createElement('div', { style: valueStyle }, tenant.apartment_number || 'Not Assigned')
                    ),
                    React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Move-in Date'),
                        React.createElement('div', { style: valueStyle }, 
                            tenant.move_in_date ? new Date(tenant.move_in_date).toLocaleDateString() : 'N/A'
                        )
                    ),
                    tenant.apartment_status && React.createElement('div', { style: infoItemStyle },
                        React.createElement('div', { style: labelStyle }, 'Apartment Status'),
                        React.createElement('div', { style: valueStyle }, tenant.apartment_status)
                    )
                )
            ),

            // Occupants Card
            React.createElement('div', { style: cardStyle },
                React.createElement('h2', { style: sectionTitleStyle }, 
                    `👨‍👩‍👧‍👦 Household Members (${tenant.occupants ? tenant.occupants.length : 0})`
                ),
                tenant.occupants && tenant.occupants.length > 0
                    ? React.createElement('div', { style: occupantsGridStyle },
                        tenant.occupants.map(occupant =>
                            React.createElement('div', { key: occupant.id, style: occupantCardStyle },
                                React.createElement('div', { style: occupantNameStyle }, occupant.name),
                                React.createElement('div', { style: occupantInfoStyle },
                                    React.createElement('strong', null, 'Relationship: '),
                                    occupant.relationship
                                ),
                                React.createElement('div', { style: occupantInfoStyle },
                                    React.createElement('strong', null, 'Age: '),
                                    occupant.age
                                ),
                                occupant.phone && React.createElement('div', { style: occupantInfoStyle },
                                    React.createElement('strong', null, 'Phone: '),
                                    occupant.phone
                                )
                            )
                        )
                    )
                    : React.createElement('div', { style: emptyStateStyle },
                        'No household members registered'
                    )
            )
        ),

        // Assign Apartment Modal
        showAssignModal && React.createElement('div', { style: modalOverlayStyle, onClick: () => setShowAssignModal(false) },
            React.createElement('div', { style: modalStyle, onClick: (e) => e.stopPropagation() },
                React.createElement('h2', { style: modalTitleStyle }, 
                    tenant.apartment_number ? '🔄 Reassign Apartment' : '📍 Assign Apartment'
                ),
                
                React.createElement('div', { style: formGroupStyle },
                    React.createElement('label', { style: labelFormStyle }, 'Select Apartment'),
                    React.createElement('select', {
                        style: selectStyle,
                        value: selectedApartment,
                        onChange: (e) => setSelectedApartment(e.target.value)
                    },
                        React.createElement('option', { value: '' }, '-- Choose Apartment --'),
                        tenant.apartment_number && React.createElement('option', { value: 'remove' }, 
                            '🚫 Remove Current Apartment'
                        ),
                        availableApartments.map(apt =>
                            React.createElement('option', { key: apt.id, value: apt.id },
                                `Apt ${apt.apartment_number} - Floor ${apt.floor} (${apt.bedrooms}BR/$${apt.rent})`
                            )
                        ),
                        availableApartments.length === 0 && React.createElement('option', { disabled: true },
                            'No apartments available'
                        )
                    )
                ),

                React.createElement('div', { style: modalButtonsStyle },
                    React.createElement('button', {
                        style: { ...buttonStyle, background: '#95a5a6', marginRight: 0 },
                        onClick: () => setShowAssignModal(false)
                    }, 'Cancel'),
                    React.createElement('button', {
                        style: { ...buttonStyle, background: '#27ae60', marginRight: 0 },
                        onClick: handleAssignSubmit
                    }, 'Confirm')
                )
            )
        )
    );
}

export default TenantDetails;
