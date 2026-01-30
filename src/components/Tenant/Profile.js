import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';

function Profile() {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.userId) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await tenantAPI.getById(user.userId);
            setProfile(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await tenantAPI.update(user.userId, {
                full_name: profile.full_name,
                email: profile.email,
                phone: profile.phone,
                occupation: profile.occupation
            });
            setEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
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

    const cardStyle = {
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

    const infoRowStyle = {
        display: 'flex',
        padding: '16px 0',
        borderBottom: '1px solid #ecf0f1'
    };

    const labelStyle = {
        fontWeight: 'bold',
        width: '180px',
        color: '#7f8c8d'
    };

    const valueStyle = {
        color: '#2c3e50',
        flex: 1
    };

    const inputStyle = {
        flex: 1,
        padding: '8px',
        border: '2px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: '14px'
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
        marginTop: '20px',
        marginRight: '12px'
    };

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading profile...')
            )
        );
    }

    if (!profile) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Profile not found')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: cardStyle },
                React.createElement('h1', { style: titleStyle }, 'My Profile'),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Name:'),
                    editing 
                        ? React.createElement('input', {
                            type: 'text',
                            value: profile.full_name,
                            onChange: (e) => setProfile({...profile, full_name: e.target.value}),
                            style: inputStyle
                        })
                        : React.createElement('div', { style: valueStyle }, profile.full_name)
                ),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Email:'),
                    editing 
                        ? React.createElement('input', {
                            type: 'email',
                            value: profile.email,
                            onChange: (e) => setProfile({...profile, email: e.target.value}),
                            style: inputStyle
                        })
                        : React.createElement('div', { style: valueStyle }, profile.email)
                ),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Phone:'),
                    editing 
                        ? React.createElement('input', {
                            type: 'tel',
                            value: profile.phone,
                            onChange: (e) => setProfile({...profile, phone: e.target.value}),
                            style: inputStyle
                        })
                        : React.createElement('div', { style: valueStyle }, profile.phone)
                ),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Occupation:'),
                    editing 
                        ? React.createElement('input', {
                            type: 'text',
                            value: profile.occupation,
                            onChange: (e) => setProfile({...profile, occupation: e.target.value}),
                            style: inputStyle
                        })
                        : React.createElement('div', { style: valueStyle }, profile.occupation)
                ),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Apartment:'),
                    React.createElement('div', { style: valueStyle }, profile.apartment_number || 'N/A')
                ),

                React.createElement('div', { style: infoRowStyle },
                    React.createElement('div', { style: labelStyle }, 'Move-in Date:'),
                    React.createElement('div', { style: valueStyle }, profile.move_in_date)
                ),

                editing 
                    ? React.createElement('div', null,
                        React.createElement('button', { onClick: handleSave, style: buttonStyle }, 'Save Changes'),
                        React.createElement('button', { 
                            onClick: () => setEditing(false), 
                            style: {...buttonStyle, background: '#95a5a6'} 
                        }, 'Cancel')
                    )
                    : React.createElement('button', { 
                        onClick: () => setEditing(true), 
                        style: buttonStyle 
                    }, 'Edit Profile')
            )
        )
    );
}

export default Profile;
