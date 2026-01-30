import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { occupantAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';

function ManageOccupants() {
    const { user } = useAuth();
    const [occupants, setOccupants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newOccupant, setNewOccupant] = useState({
        name: '',
        relationship: '',
        age: '',
        phone: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchOccupants();
    }, []);

    const fetchOccupants = async () => {
        try {
            const data = await occupantAPI.getByTenantId(user.userId);
            setOccupants(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching occupants:', error);
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!newOccupant.name || !newOccupant.relationship || !newOccupant.age) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await occupantAPI.create({ 
                ...newOccupant, 
                tenant_id: user.userId 
            });
            setNewOccupant({ name: '', relationship: '', age: '', phone: '' });
            setShowForm(false);
            fetchOccupants();
            alert('Occupant added successfully!');
        } catch (error) {
            console.error('Error adding occupant:', error);
            alert('Failed to add occupant');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this occupant?')) {
            try {
                await occupantAPI.delete(id);
                fetchOccupants();
                alert('Occupant removed successfully!');
            } catch (error) {
                console.error('Error deleting occupant:', error);
                alert('Failed to remove occupant');
            }
        }
    };

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

    const buttonStyle = {
        padding: '12px 24px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
    };

    const cardStyle = {
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const formStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '2px solid #e0e0e0',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '12px',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '6px',
        color: '#333',
        fontWeight: '600',
        fontSize: '14px'
    };

    const cardTitleStyle = {
        marginBottom: '12px',
        color: '#2c3e50',
        fontSize: '20px',
        fontWeight: 'bold'
    };

    const cardTextStyle = {
        marginBottom: '8px',
        color: '#555',
        fontSize: '14px'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px 20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading occupants...')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, 'Manage Occupants'),
                React.createElement('button', { 
                    style: buttonStyle, 
                    onClick: () => setShowForm(!showForm) 
                }, showForm ? 'Cancel' : '+ Add Occupant')
            ),

            showForm ? React.createElement('div', { style: formStyle },
                React.createElement('h3', { style: { marginBottom: '20px', color: '#2c3e50' } }, 'Add New Occupant'),
                
                React.createElement('div', null,
                    React.createElement('label', { style: labelStyle }, 'Name *'),
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Enter full name',
                        value: newOccupant.name,
                        onChange: (e) => setNewOccupant({...newOccupant, name: e.target.value}),
                        style: inputStyle
                    })
                ),
                
                React.createElement('div', null,
                    React.createElement('label', { style: labelStyle }, 'Relationship *'),
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'e.g., Spouse, Child, Parent',
                        value: newOccupant.relationship,
                        onChange: (e) => setNewOccupant({...newOccupant, relationship: e.target.value}),
                        style: inputStyle
                    })
                ),
                
                React.createElement('div', null,
                    React.createElement('label', { style: labelStyle }, 'Age *'),
                    React.createElement('input', {
                        type: 'number',
                        placeholder: 'Enter age',
                        value: newOccupant.age,
                        onChange: (e) => setNewOccupant({...newOccupant, age: e.target.value}),
                        style: inputStyle,
                        min: '0',
                        max: '120'
                    })
                ),
                
                React.createElement('div', null,
                    React.createElement('label', { style: labelStyle }, 'Phone (Optional)'),
                    React.createElement('input', {
                        type: 'tel',
                        placeholder: 'Enter phone number',
                        value: newOccupant.phone,
                        onChange: (e) => setNewOccupant({...newOccupant, phone: e.target.value}),
                        style: inputStyle
                    })
                ),
                
                React.createElement('button', { 
                    onClick: handleAdd, 
                    style: { ...buttonStyle, marginTop: '10px' } 
                }, 'Add Occupant')
            ) : null,

            occupants.length === 0 
                ? React.createElement('div', { style: emptyStateStyle },
                    React.createElement('h3', { style: { color: '#7f8c8d', marginBottom: '10px' } }, 'No Occupants Found'),
                    React.createElement('p', { style: { color: '#95a5a6' } }, 'Click "Add Occupant" to add household members')
                )
                : React.createElement('div', { style: gridStyle },
                    occupants.map(occ => 
                        React.createElement('div', { key: occ.id, style: cardStyle },
                            React.createElement('h3', { style: cardTitleStyle }, occ.name),
                            React.createElement('p', { style: cardTextStyle }, 
                                React.createElement('strong', null, 'Relationship: '),
                                occ.relationship
                            ),
                            React.createElement('p', { style: cardTextStyle }, 
                                React.createElement('strong', null, 'Age: '),
                                occ.age
                            ),
                            occ.phone ? React.createElement('p', { style: cardTextStyle }, 
                                React.createElement('strong', null, 'Phone: '),
                                occ.phone
                            ) : null,
                            React.createElement('button', { 
                                onClick: () => handleDelete(occ.id),
                                style: {
                                    ...buttonStyle, 
                                    background: '#e74c3c', 
                                    marginTop: '12px',
                                    width: '100%'
                                } 
                            }, 'Remove')
                        )
                    )
                )
        )
    );
}

export default ManageOccupants;
