import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { occupantAPI, tenantAPI } from '../../services/api';
import Header from '../Header';

function OccupantForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        tenant_id: '',
        full_name: '',
        relationship: '',
        age: '',
        phone: ''
    });

    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTenants();
        if (isEdit) {
            fetchOccupant();
        }
    }, [id]);

    const fetchTenants = async () => {
        try {
            const data = await tenantAPI.getAll();
            setTenants(data);
        } catch (error) {
            console.error('Error fetching tenants:', error);
        }
    };

    const fetchOccupant = async () => {
        try {
            const data = await occupantAPI.getById(id);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching occupant:', error);
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
                await occupantAPI.update(id, formData);
                alert('Occupant updated successfully!');
            } else {
                await occupantAPI.create(formData);
                alert('Occupant created successfully!');
            }
            navigate('/admin/occupants');
        } catch (error) {
            console.error('Error saving occupant:', error);
            alert('Error saving occupant: ' + (error.response?.data?.message || error.message));
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
                    isEdit ? '✏️ Edit Occupant' : '➕ Add New Occupant'
                ),
                React.createElement('form', { onSubmit: handleSubmit },
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Tenant *'),
                        React.createElement('select', {
                            name: 'tenant_id',
                            value: formData.tenant_id,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle
                        },
                            React.createElement('option', { value: '' }, '-- Select Tenant --'),
                            tenants.map(tenant => 
                                React.createElement('option', { 
                                    key: tenant.id, 
                                    value: tenant.id 
                                }, tenant.full_name)
                            )
                        )
                    ),

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
                        React.createElement('label', { style: labelStyle }, 'Relationship'),
                        React.createElement('select', {
                            name: 'relationship',
                            value: formData.relationship,
                            onChange: handleChange,
                            style: inputStyle
                        },
                            React.createElement('option', { value: '' }, '-- Select Relationship --'),
                            React.createElement('option', { value: 'Spouse' }, 'Spouse'),
                            React.createElement('option', { value: 'Child' }, 'Child'),
                            React.createElement('option', { value: 'Parent' }, 'Parent'),
                            React.createElement('option', { value: 'Sibling' }, 'Sibling'),
                            React.createElement('option', { value: 'Relative' }, 'Relative'),
                            React.createElement('option', { value: 'Roommate' }, 'Roommate'),
                            React.createElement('option', { value: 'Other' }, 'Other')
                        )
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Age'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'age',
                            value: formData.age,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Enter age'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Phone'),
                        React.createElement('input', {
                            type: 'tel',
                            name: 'phone',
                            value: formData.phone,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Enter phone number'
                        })
                    ),

                    React.createElement('div', { style: buttonGroupStyle },
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            style: buttonStyle(true),
                            onMouseEnter: (e) => !loading && (e.target.style.background = '#5568d3'),
                            onMouseLeave: (e) => !loading && (e.target.style.background = '#667eea')
                        }, loading ? 'Saving...' : (isEdit ? 'Update Occupant' : 'Create Occupant')),
                        
                        React.createElement('button', {
                            type: 'button',
                            onClick: () => navigate('/admin/occupants'),
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

export default OccupantForm;
