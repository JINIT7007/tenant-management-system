import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tenantAPI, apartmentAPI } from '../../services/api';
import Header from '../Header';

function TenantForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        apartment_id: '',
        lease_start: '',
        lease_end: '',
        rent_amount: '',
        status: 'active'
    });

    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchApartments();
        if (isEdit) {
            fetchTenant();
        }
    }, [id]);

    const fetchApartments = async () => {
        try {
            const data = await apartmentAPI.getAll();
            setApartments(data);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    const fetchTenant = async () => {
        try {
            const data = await tenantAPI.getById(id);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching tenant:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await tenantAPI.update(id, formData);
                alert('Tenant updated successfully!');
            } else {
                await tenantAPI.create(formData);
                alert('Tenant created successfully!');
            }
            navigate('/admin/tenants');
        } catch (error) {
            console.error('Error saving tenant:', error);
            alert('Error saving tenant: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
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
        marginBottom: '24px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        transition: 'border 0.3s',
        boxSizing: 'border-box'
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: '16px',
        marginTop: '30px'
    };

    const buttonStyle = (isPrimary) => ({
        padding: '12px 32px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        background: isPrimary ? '#667eea' : '#95a5a6',
        color: 'white',
        opacity: loading ? 0.6 : 1
    });

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: cardStyle },
                React.createElement('h1', { style: titleStyle }, 
                    isEdit ? '✏️ Edit Tenant' : '➕ Add New Tenant'
                ),
                React.createElement('form', { onSubmit: handleSubmit },
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Full Name *'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'full_name',
                            value: formData.full_name,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle,
                            placeholder: 'Enter full name'
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
                            style: inputStyle,
                            placeholder: 'Enter email address'
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
                            style: inputStyle,
                            placeholder: 'Enter phone number'
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
                            React.createElement('option', { value: '' }, '-- Select Apartment --'),
                            apartments.map(apt => 
                                React.createElement('option', { 
                                    key: apt.id, 
                                    value: apt.id 
                                }, `${apt.apartment_number} - Floor ${apt.floor}`)
                            )
                        )
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Lease Start Date'),
                        React.createElement('input', {
                            type: 'date',
                            name: 'lease_start',
                            value: formData.lease_start ? formData.lease_start.split('T')[0] : '',
                            onChange: handleChange,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Lease End Date'),
                        React.createElement('input', {
                            type: 'date',
                            name: 'lease_end',
                            value: formData.lease_end ? formData.lease_end.split('T')[0] : '',
                            onChange: handleChange,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Rent Amount'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'rent_amount',
                            value: formData.rent_amount,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Enter rent amount'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Status'),
                        React.createElement('select', {
                            name: 'status',
                            value: formData.status,
                            onChange: handleChange,
                            style: inputStyle
                        },
                            React.createElement('option', { value: 'active' }, 'Active'),
                            React.createElement('option', { value: 'inactive' }, 'Inactive')
                        )
                    ),

                    React.createElement('div', { style: buttonGroupStyle },
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            style: buttonStyle(true),
                            onMouseEnter: (e) => !loading && (e.target.style.background = '#5568d3'),
                            onMouseLeave: (e) => !loading && (e.target.style.background = '#667eea')
                        }, loading ? 'Saving...' : (isEdit ? 'Update Tenant' : 'Create Tenant')),
                        
                        React.createElement('button', {
                            type: 'button',
                            onClick: () => navigate('/admin/tenants'),
                            style: buttonStyle(false),
                            onMouseEnter: (e) => e.target.style.background = '#7f8c8d',
                            onMouseLeave: (e) => e.target.style.background = '#95a5a6'
                        }, 'Cancel')
                    )
                )
            )
        )
    );
}

export default TenantForm;
