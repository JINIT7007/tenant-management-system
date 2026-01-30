import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function TenantOccupants() {
  const navigate = useNavigate();
  const [occupants, setOccupants] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      relation: 'Spouse',
      age: 28,
      phone: '+91 98765 43211'
    },
    {
      id: 2,
      name: 'Tom Doe',
      relation: 'Son',
      age: 5,
      phone: 'N/A'
    }
  ]);

  const containerStyle = {
    background: '#f5f5f5',
    minHeight: '100vh'
  };

  const contentStyle = {
    padding: '40px',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '30px'
  };

  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    background: '#f8f9fa',
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#2c3e50',
    borderBottom: '2px solid #e0e0e0'
  };

  const tdStyle = {
    padding: '15px',
    borderBottom: '1px solid #e0e0e0',
    color: '#555'
  };

  const buttonStyle = {
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '13px'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#e74c3c'
  };

  const addButtonStyle = {
    padding: '12px 24px',
    background: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  const handleDeleteOccupant = (id) => {
    setOccupants(occupants.filter(occ => occ.id !== id));
    alert('Occupant removed successfully!');
  };

  return (
    <div style={containerStyle}>
      <Header />
      
      <div style={contentStyle}>
        <h1 style={titleStyle}>Household Members</h1>
        
        <div style={cardStyle}>
          <button style={addButtonStyle} onClick={() => alert('Add new occupant feature coming soon!')}>
            + Add New Member
          </button>

          {occupants.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Relation</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {occupants.map((occupant) => (
                  <tr key={occupant.id}>
                    <td style={tdStyle}>{occupant.name}</td>
                    <td style={tdStyle}>{occupant.relation}</td>
                    <td style={tdStyle}>{occupant.age}</td>
                    <td style={tdStyle}>{occupant.phone}</td>
                    <td style={tdStyle}>
                      <button style={buttonStyle} onClick={() => alert('Edit feature coming soon!')}>Edit</button>
                      <button style={deleteButtonStyle} onClick={() => handleDeleteOccupant(occupant.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{textAlign: 'center', padding: '40px', color: '#7f8c8d'}}>
              <p>No household members added yet.</p>
            </div>
          )}
        </div>

        <div style={{marginTop: '20px'}}>
          <button style={{...deleteButtonStyle, background: '#bdc3c7'}} onClick={() => navigate('/tenant/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default TenantOccupants;
