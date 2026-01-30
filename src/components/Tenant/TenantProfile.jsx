import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function TenantProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai',
    apartment: 'A-501',
    moveInDate: '2023-01-15',
    lease: '2 Years'
  });

  const [isEditing, setIsEditing] = useState(false);

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
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '30px'
  };

  const fieldStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#7f8c8d',
    textTransform: 'uppercase',
    marginBottom: '5px'
  };

  const valueStyle = {
    fontSize: '16px',
    color: '#2c3e50'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #bdc3c7',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: 'inherit'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    background: '#bdc3c7'
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div style={containerStyle}>
      <Header />
      
      <div style={contentStyle}>
        <h1 style={titleStyle}>My Profile</h1>
        
        <div style={cardStyle}>
          <h2 style={{fontSize: '20px', marginBottom: '20px', color: '#2c3e50'}}>Personal Information</h2>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Full Name</div>
            {isEditing ? (
              <input 
                style={inputStyle}
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            ) : (
              <div style={valueStyle}>{profile.name}</div>
            )}
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Email</div>
            {isEditing ? (
              <input 
                style={inputStyle}
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              <div style={valueStyle}>{profile.email}</div>
            )}
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Phone</div>
            {isEditing ? (
              <input 
                style={inputStyle}
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            ) : (
              <div style={valueStyle}>{profile.phone}</div>
            )}
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Address</div>
            {isEditing ? (
              <input 
                style={inputStyle}
                value={profile.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            ) : (
              <div style={valueStyle}>{profile.address}</div>
            )}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{fontSize: '20px', marginBottom: '20px', color: '#2c3e50'}}>Apartment Details</h2>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Apartment Number</div>
            <div style={valueStyle}>{profile.apartment}</div>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Move-in Date</div>
            <div style={valueStyle}>{profile.moveInDate}</div>
          </div>

          <div style={fieldStyle}>
            <div style={labelStyle}>Lease Duration</div>
            <div style={valueStyle}>{profile.lease}</div>
          </div>
        </div>

        <div style={{marginTop: '20px'}}>
          {isEditing ? (
            <>
              <button style={buttonStyle} onClick={handleSave}>Save Changes</button>
              <button style={cancelButtonStyle} onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button style={buttonStyle} onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button style={cancelButtonStyle} onClick={() => navigate('/tenant/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default TenantProfile;
