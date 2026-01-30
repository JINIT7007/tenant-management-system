import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apartmentAPI } from '../../services/api';
import Header from '../Header';

function ApartmentForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        apartment_number: '',
        floor: '',
        bedrooms: '',
        bathrooms: '',
        square_feet: '',
        rent_amount: '',
        status: 'available'
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchApartment();
        }
    }, [id]);

    const fetchApartment = async () => {
        try {
            const data = await apartmentAPI.getById(id);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching apartment:', error);
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
                await apartmentAPI.update(id, formData);
                alert('Apartment updated successfully!');
            } else {
                await apartmentAPI.create(formData);
                alert('Apartment created successfully!');
            }
            navigate('/admin/apartments');
        } catch (error) {
            console.error('Error saving apartment:', error);
            alert('Error saving apartment: ' + (error.response?.data?.message || error.message));
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
                    isEdit ? '✏️ Edit Apartment' : '➕ Add New Apartment'
                ),
                React.createElement('form', { onSubmit: handleSubmit },
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Apartment Number *'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'apartment_number',
                            value: formData.apartment_number,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle,
                            placeholder: 'e.g., A-101, B-205'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Floor *'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'floor',
                            value: formData.floor,
                            onChange: handleChange,
                            required: true,
                            style: inputStyle,
                            placeholder: 'Enter floor number'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Bedrooms'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'bedrooms',
                            value: formData.bedrooms,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Number of bedrooms'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Bathrooms'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'bathrooms',
                            value: formData.bathrooms,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Number of bathrooms'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Square Feet'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'square_feet',
                            value: formData.square_feet,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Total area in sq ft'
                        })
                    ),

                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Rent Amount (₹)'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'rent_amount',
                            value: formData.rent_amount,
                            onChange: handleChange,
                            style: inputStyle,
                            placeholder: 'Monthly rent amount'
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
                            React.createElement('option', { value: 'available' }, 'Available'),
                            React.createElement('option', { value: 'occupied' }, 'Occupied')
                        )
                    ),

                    React.createElement('div', { style: buttonGroupStyle },
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            style: buttonStyle(true),
                            onMouseEnter: (e) => !loading && (e.target.style.background = '#5568d3'),
                            onMouseLeave: (e) => !loading && (e.target.style.background = '#667eea')
                        }, loading ? 'Saving...' : (isEdit ? 'Update Apartment' : 'Create Apartment')),
                        
                        React.createElement('button', {
                            type: 'button',
                            onClick: () => navigate('/admin/apartments'),
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

export default ApartmentForm;
