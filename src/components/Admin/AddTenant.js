import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, apartmentAPI } from '../../services/api';
import Header from '../Header';

function AddTenant() {
    const navigate = useNavigate();
    const [apartments, setApartments] = useState([]);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        occupation: '',
        apartment_id: '',
        move_in_date: ''
    });

    useEffect(() => {
        fetchApartments();
    }, []);

    const fetchApartments = async () => {
        try {
            const data = await apartmentAPI.getAll();
            setApartments(data);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await tenantAPI.create({
                ...formData,
                apartment_id: formData.apartment_id || null
            });
            alert('Tenant added successfully!');
            navigate('/admin/tenants');
        } catch (error) {
            console.error('Error creating tenant:', error);
            alert('Failed to add tenant');
        }
    };

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto'
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

    const cardStyle = {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '30px'
    };

    const formGroupStyle = {
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#2c3e50'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '12px',
        marginTop: '30px'
    };

    const submitButtonStyle = {
        padding: '14px 32px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        flex: 1
    };

    const cancelButtonStyle = {
        padding: '14px 32px',
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        flex: 1
    };

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('button', { 
                style: backButtonStyle,
                onClick: () => navigate('/admin/tenants')
            }, '← Back to Tenants'),

            React.createElement('div', { style: cardStyle },
                React.createElement('h1', { style: titleStyle }, 'Add New Tenant'),

                React.createElement('form', { onSubmit: handleSubmit },
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Full Name *'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'full_name',
                            value: formData.full_name,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Email *'),
                        React.createElement('input', {
                            type: 'email',
                            name: 'email',
                            value: formData.email,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Phone *'),
                        React.createElement('input', {
                            type: 'tel',
                            name: 'phone',
                            value: formData.phone,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Occupation'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'occupation',
                            value: formData.occupation,
                            onChange: handleChange,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Apartment'),
                        React.createElement('select', {
                            name: 'apartment_id',
                            value: formData.apartment_id,
                            onChange: handleChange,
                            style: inputStyle
                        },
                            React.createElement('option', { value: '' }, 'Select Apartment (Optional)'),
                            apartments.map(apt => 
                                React.createElement('option', { 
                                    key: apt.id, 
                                    value: apt.id,
                                    disabled: apt.status === 'occupied'
                                }, 
                                    `${apt.apartment_number} - Floor ${apt.floor} (${apt.status})`
                                )
                            )
                        )
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Move-in Date'),
                        React.createElement('input', {
                            type: 'date',
                            name: 'move_in_date',
                            value: formData.move_in_date,
                            onChange: handleChange,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: buttonContainerStyle },
                        React.createElement('button', {
                            type: 'button',
                            style: cancelButtonStyle,
                            onClick: () => navigate('/admin/tenants')
                        }, 'Cancel'),
                        React.createElement('button', {
                            type: 'submit',
                            style: submitButtonStyle
                        }, 'Add Tenant')
                    )
                )
            )
        )
    );
}

export default AddTenant;
