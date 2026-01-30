import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apartmentAPI } from '../../services/api';
import Header from '../Header';

function AddApartment() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        apartment_number: '',
        floor: '',
        bedrooms: '',
        bathrooms: '',
        rent: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.apartment_number.trim()) {
            newErrors.apartment_number = 'Apartment number is required';
        }

        if (!formData.floor) {
            newErrors.floor = 'Floor is required';
        } else if (parseInt(formData.floor) < 0) {
            newErrors.floor = 'Floor cannot be negative';
        }

        if (!formData.bedrooms) {
            newErrors.bedrooms = 'Number of bedrooms is required';
        } else if (parseInt(formData.bedrooms) < 1) {
            newErrors.bedrooms = 'At least 1 bedroom required';
        }

        if (!formData.bathrooms) {
            newErrors.bathrooms = 'Number of bathrooms is required';
        } else if (parseFloat(formData.bathrooms) < 1) {
            newErrors.bathrooms = 'At least 1 bathroom required';
        }

        if (!formData.rent) {
            newErrors.rent = 'Rent is required';
        } else if (parseFloat(formData.rent) <= 0) {
            newErrors.rent = 'Rent must be greater than 0';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await apartmentAPI.create({
                apartment_number: formData.apartment_number.trim(),
                floor: parseInt(formData.floor),
                bedrooms: parseInt(formData.bedrooms),
                bathrooms: parseFloat(formData.bathrooms),
                rent: parseFloat(formData.rent)
            });

            alert('Apartment added successfully!');
            navigate('/admin/apartments');
        } catch (error) {
            console.error('Error creating apartment:', error);
            alert('Failed to add apartment. Apartment number might already exist.');
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
        boxSizing: 'border-box',
        transition: 'border-color 0.2s'
    };

    const inputErrorStyle = {
        ...inputStyle,
        borderColor: '#e74c3c'
    };

    const errorTextStyle = {
        color: '#e74c3c',
        fontSize: '12px',
        marginTop: '6px',
        display: 'block'
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

    const helperTextStyle = {
        fontSize: '12px',
        color: '#7f8c8d',
        marginTop: '6px'
    };

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('button', { 
                style: backButtonStyle,
                onClick: () => navigate('/admin/apartments')
            }, '← Back to Apartments'),

            React.createElement('div', { style: cardStyle },
                React.createElement('h1', { style: titleStyle }, '🏢 Add New Apartment'),

                React.createElement('form', { onSubmit: handleSubmit },
                    // Apartment Number
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Apartment Number *'),
                        React.createElement('input', {
                            type: 'text',
                            name: 'apartment_number',
                            value: formData.apartment_number,
                            onChange: handleChange,
                            style: errors.apartment_number ? inputErrorStyle : inputStyle,
                            placeholder: 'e.g., 101, A-302, 2B'
                        }),
                        errors.apartment_number && React.createElement('span', { style: errorTextStyle }, 
                            errors.apartment_number
                        ),
                        !errors.apartment_number && React.createElement('span', { style: helperTextStyle },
                            'Unique identifier for the apartment'
                        )
                    ),

                    // Floor
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Floor *'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'floor',
                            value: formData.floor,
                            onChange: handleChange,
                            style: errors.floor ? inputErrorStyle : inputStyle,
                            placeholder: 'e.g., 1, 2, 3',
                            min: '0'
                        }),
                        errors.floor && React.createElement('span', { style: errorTextStyle }, 
                            errors.floor
                        ),
                        !errors.floor && React.createElement('span', { style: helperTextStyle },
                            'Floor number (0 for ground floor)'
                        )
                    ),

                    // Bedrooms
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Bedrooms *'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'bedrooms',
                            value: formData.bedrooms,
                            onChange: handleChange,
                            style: errors.bedrooms ? inputErrorStyle : inputStyle,
                            placeholder: 'e.g., 1, 2, 3',
                            min: '1'
                        }),
                        errors.bedrooms && React.createElement('span', { style: errorTextStyle }, 
                            errors.bedrooms
                        ),
                        !errors.bedrooms && React.createElement('span', { style: helperTextStyle },
                            'Number of bedrooms'
                        )
                    ),

                    // Bathrooms
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Bathrooms *'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'bathrooms',
                            value: formData.bathrooms,
                            onChange: handleChange,
                            style: errors.bathrooms ? inputErrorStyle : inputStyle,
                            placeholder: 'e.g., 1, 1.5, 2',
                            step: '0.5',
                            min: '1'
                        }),
                        errors.bathrooms && React.createElement('span', { style: errorTextStyle }, 
                            errors.bathrooms
                        ),
                        !errors.bathrooms && React.createElement('span', { style: helperTextStyle },
                            'Number of bathrooms (0.5 increments allowed)'
                        )
                    ),

                    // Rent
                    React.createElement('div', { style: formGroupStyle },
                        React.createElement('label', { style: labelStyle }, 'Monthly Rent ($) *'),
                        React.createElement('input', {
                            type: 'number',
                            name: 'rent',
                            value: formData.rent,
                            onChange: handleChange,
                            style: errors.rent ? inputErrorStyle : inputStyle,
                            placeholder: 'e.g., 1500, 2000',
                            step: '0.01',
                            min: '0'
                        }),
                        errors.rent && React.createElement('span', { style: errorTextStyle }, 
                            errors.rent
                        ),
                        !errors.rent && React.createElement('span', { style: helperTextStyle },
                            'Monthly rent amount in dollars'
                        )
                    ),

                    // Buttons
                    React.createElement('div', { style: buttonContainerStyle },
                        React.createElement('button', {
                            type: 'button',
                            style: cancelButtonStyle,
                            onClick: () => navigate('/admin/apartments'),
                            onMouseEnter: (e) => e.target.style.background = '#7f8c8d',
                            onMouseLeave: (e) => e.target.style.background = '#95a5a6'
                        }, 'Cancel'),
                        React.createElement('button', {
                            type: 'submit',
                            style: submitButtonStyle,
                            onMouseEnter: (e) => e.target.style.background = '#5568d3',
                            onMouseLeave: (e) => e.target.style.background = '#667eea'
                        }, 'Add Apartment')
                    )
                )
            )
        )
    );
}

export default AddApartment;
