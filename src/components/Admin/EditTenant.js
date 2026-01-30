import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tenantAPI } from '../../services/api';
import Header from '../Header';

function EditTenant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        occupation: ''
    });

    useEffect(() => {
        fetchTenant();
    }, []);

    const fetchTenant = async () => {
        try {
            const data = await tenantAPI.getById(id);
            setFormData({
                full_name: data.full_name,
                email: data.email,
                phone: data.phone,
                occupation: data.occupation
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tenant:', error);
            alert('Failed to load tenant data');
            navigate('/admin/tenants');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await tenantAPI.update(id, formData);
            alert('Tenant updated successfully!');
            navigate('/admin/tenants');
        } catch (error) {
            console.error('Error updating tenant:', error);
            alert('Failed to update tenant');
        }
    };

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px',
        display: 'flex',
        justifyContent: 'center'
    };

    const formBoxStyle = {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '30px'
    };

    const inputGroupStyle = {
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: '#333',
        fontWeight: '600',
        fontSize: '14px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        padding: '14px 28px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '12px'
    };

    const cancelButtonStyle = {
        padding: '14px 28px',
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading tenant data...')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: formBoxStyle },
                React.createElement('h1', { style: titleStyle }, 'Edit Tenant'),
                
                React.createElement('form', { onSubmit: handleSubmit },
                    React.createElement('div', { style: inputGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Full Name'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'full_name',
                            value: formData.full_name,
                            onChange: handleChange,
                            style: inputStyle,
                            required: true
                        })
                    ),

                    React.createElement('div', { style: inputGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Email'),
                        React.createElement('input', {
                            type: 'email',
                            name: 'email',
                            value: formData.email,
                            onChange: handleChange,
                            style: inputStyle,
                            required: true
                        })
                    ),

                    React.createElement('div', { style: inputGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Phone'),
                        React.createElement('input', {
                            type: 'tel',
                            name: 'phone',
                            value: formData.phone,
                            onChange: handleChange,
                            style: inputStyle,
                            required: true
                        })
                    ),

                    React.createElement('div', { style: inputGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Occupation'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'occupation',
                            value: formData.occupation,
                            onChange: handleChange,
                            style: inputStyle
                        })
                    ),

                    React.createElement('div', null,
                        React.createElement('button', { type: 'submit', style: buttonStyle }, 'Update Tenant'),
                        React.createElement('button', { 
                            type: 'button', 
                            style: cancelButtonStyle,
                            onClick: () => navigate('/admin/tenants')
                        }, 'Cancel')
                    )
                )
            )
        )
    );
}

export default EditTenant;
