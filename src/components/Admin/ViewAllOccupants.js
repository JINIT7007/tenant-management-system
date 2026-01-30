import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { occupantAPI } from '../../services/api';
import Header from '../Header';

function ViewAllOccupants() {
    const [occupants, setOccupants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRelationship, setFilterRelationship] = useState('all');
    const [filterAgeRange, setFilterAgeRange] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllOccupants();
    }, []);

    const fetchAllOccupants = async () => {
        try {
            const data = await occupantAPI.getAll();
            setOccupants(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching occupants:', error);
            setLoading(false);
        }
    };

    const filteredOccupants = occupants.filter(occupant => {
        const searchLower = searchQuery.toLowerCase();
        
        // Search filter
        const matchesSearch = !searchQuery || (
            occupant.name.toLowerCase().includes(searchLower) ||
            occupant.tenant_name.toLowerCase().includes(searchLower) ||
            (occupant.apartment_number && occupant.apartment_number.toLowerCase().includes(searchLower)) ||
            occupant.relationship.toLowerCase().includes(searchLower) ||
            (occupant.phone && occupant.phone.includes(searchQuery))
        );

        // Relationship filter
        const matchesRelationship = filterRelationship === 'all' || 
            occupant.relationship.toLowerCase() === filterRelationship.toLowerCase();

        // Age range filter
        let matchesAgeRange = true;
        if (filterAgeRange !== 'all') {
            const age = occupant.age;
            switch (filterAgeRange) {
                case 'child':
                    matchesAgeRange = age < 18;
                    break;
                case 'adult':
                    matchesAgeRange = age >= 18 && age < 60;
                    break;
                case 'senior':
                    matchesAgeRange = age >= 60;
                    break;
            }
        }

        return matchesSearch && matchesRelationship && matchesAgeRange;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setFilterRelationship('all');
        setFilterAgeRange('all');
    };

    // Get unique relationships for filter
    const uniqueRelationships = [...new Set(occupants.map(o => o.relationship))].sort();

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

    const filterContainerStyle = {
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px'
    };

    const filterRowStyle = {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr auto',
        gap: '16px',
        alignItems: 'end'
    };

    const filterGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const filterLabelStyle = {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#2c3e50',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const searchBoxStyle = {
        width: '100%',
        padding: '12px 20px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const selectStyle = {
        width: '100%',
        padding: '12px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '14px',
        boxSizing: 'border-box',
        background: 'white',
        cursor: 'pointer'
    };

    const clearButtonStyle = {
        padding: '12px 20px',
        background: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    };

    const statsBoxStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px',
        display: 'flex',
        gap: '30px'
    };

    const statItemStyle = {
        flex: 1
    };

    const statNumberStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '5px'
    };

    const statLabelStyle = {
        fontSize: '14px',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const searchInfoStyle = {
        color: '#7f8c8d',
        fontSize: '14px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const activeFiltersStyle = {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    };

    const filterBadgeStyle = {
        padding: '4px 12px',
        background: '#667eea',
        color: 'white',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
    };

    const tableStyle = {
        width: '100%',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    };

    const thStyle = {
        padding: '16px',
        textAlign: 'left',
        background: '#2c3e50',
        color: 'white',
        fontWeight: 'bold'
    };

    const tdStyle = {
        padding: '16px',
        borderBottom: '1px solid #ecf0f1'
    };

    const linkStyle = {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px 20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: '#95a5a6',
        fontSize: '18px'
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

    if (loading) {
        return React.createElement('div', { style: containerStyle },
            React.createElement(Header),
            React.createElement('div', { style: contentStyle },
                React.createElement('p', null, 'Loading occupants...')
            )
        );
    }

    const totalOccupants = occupants.length;
    const uniqueTenants = new Set(occupants.map(o => o.tenant_id)).size;
    const avgOccupantsPerTenant = uniqueTenants > 0 ? (totalOccupants / uniqueTenants).toFixed(1) : 0;
    const childrenCount = occupants.filter(o => o.age < 18).length;

    const hasActiveFilters = searchQuery || filterRelationship !== 'all' || filterAgeRange !== 'all';

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, '👨‍👩‍👧‍👦 All Household Members')
            ),

            // Statistics Box
            React.createElement('div', { style: statsBoxStyle },
                React.createElement('div', { style: statItemStyle },
                    React.createElement('div', { style: statNumberStyle }, totalOccupants),
                    React.createElement('div', { style: statLabelStyle }, 'Total Occupants')
                ),
                React.createElement('div', { style: statItemStyle },
                    React.createElement('div', { style: statNumberStyle }, uniqueTenants),
                    React.createElement('div', { style: statLabelStyle }, 'Households')
                ),
                React.createElement('div', { style: statItemStyle },
                    React.createElement('div', { style: statNumberStyle }, avgOccupantsPerTenant),
                    React.createElement('div', { style: statLabelStyle }, 'Avg per Household')
                ),
                React.createElement('div', { style: statItemStyle },
                    React.createElement('div', { style: statNumberStyle }, childrenCount),
                    React.createElement('div', { style: statLabelStyle }, 'Children (< 18)')
                )
            ),

            // Filter Section
            React.createElement('div', { style: filterContainerStyle },
                React.createElement('div', { style: filterRowStyle },
                    React.createElement('div', { style: filterGroupStyle },
                        React.createElement('label', { style: filterLabelStyle }, '🔍 Search'),
                        React.createElement('input', {
                            type: 'text',
                            placeholder: 'Search by name, tenant, apartment, relationship, or phone...',
                            value: searchQuery,
                            onChange: (e) => setSearchQuery(e.target.value),
                            style: searchBoxStyle
                        })
                    ),

                    React.createElement('div', { style: filterGroupStyle },
                        React.createElement('label', { style: filterLabelStyle }, '👥 Relationship'),
                        React.createElement('select', {
                            value: filterRelationship,
                            onChange: (e) => setFilterRelationship(e.target.value),
                            style: selectStyle
                        },
                            React.createElement('option', { value: 'all' }, 'All Relationships'),
                            uniqueRelationships.map(rel => 
                                React.createElement('option', { key: rel, value: rel }, rel)
                            )
                        )
                    ),

                    React.createElement('div', { style: filterGroupStyle },
                        React.createElement('label', { style: filterLabelStyle }, '🎂 Age Range'),
                        React.createElement('select', {
                            value: filterAgeRange,
                            onChange: (e) => setFilterAgeRange(e.target.value),
                            style: selectStyle
                        },
                            React.createElement('option', { value: 'all' }, 'All Ages'),
                            React.createElement('option', { value: 'child' }, 'Children (< 18)'),
                            React.createElement('option', { value: 'adult' }, 'Adults (18-59)'),
                            React.createElement('option', { value: 'senior' }, 'Seniors (60+)')
                        )
                    ),

                    React.createElement('button', {
                        style: clearButtonStyle,
                        onClick: clearFilters,
                        onMouseEnter: (e) => e.target.style.background = '#7f8c8d',
                        onMouseLeave: (e) => e.target.style.background = '#95a5a6'
                    }, '🗑️ Clear')
                )
            ),

            // Search Info and Active Filters
            React.createElement('div', { style: searchInfoStyle },
                React.createElement('span', null,
                    `Showing ${filteredOccupants.length} of ${occupants.length} occupant${occupants.length !== 1 ? 's' : ''}`
                ),
                hasActiveFilters && React.createElement('div', { style: activeFiltersStyle },
                    React.createElement('span', { style: { fontSize: '12px', color: '#7f8c8d', marginRight: '8px' } }, 
                        'Active filters:'
                    ),
                    searchQuery && React.createElement('span', { style: filterBadgeStyle }, 
                        `Search: "${searchQuery}"`
                    ),
                    filterRelationship !== 'all' && React.createElement('span', { style: filterBadgeStyle }, 
                        `Relationship: ${filterRelationship}`
                    ),
                    filterAgeRange !== 'all' && React.createElement('span', { style: filterBadgeStyle }, 
                        `Age: ${filterAgeRange === 'child' ? 'Children' : filterAgeRange === 'adult' ? 'Adults' : 'Seniors'}`
                    )
                )
            ),

            // Table
            occupants.length === 0 
                ? React.createElement('div', { style: emptyStateStyle },
                    React.createElement('h3', { style: { marginBottom: '10px' } }, 'No Occupants Found'),
                    React.createElement('p', null, 'No household members have been registered yet.')
                )
                : filteredOccupants.length === 0
                    ? React.createElement('div', { style: emptyStateStyle },
                        React.createElement('h3', { style: { marginBottom: '10px' } }, 'No Matching Results'),
                        React.createElement('p', null, 'Try adjusting your search or filters.'),
                        React.createElement('button', {
                            style: { ...buttonStyle, marginTop: '20px' },
                            onClick: clearFilters
                        }, 'Clear All Filters')
                    )
                    : React.createElement('table', { style: tableStyle },
                        React.createElement('thead', null,
                            React.createElement('tr', null,
                                React.createElement('th', { style: thStyle }, 'Occupant Name'),
                                React.createElement('th', { style: thStyle }, 'Age'),
                                React.createElement('th', { style: thStyle }, 'Relationship'),
                                React.createElement('th', { style: thStyle }, 'Phone'),
                                React.createElement('th', { style: thStyle }, 'Tenant Name'),
                                React.createElement('th', { style: thStyle }, 'Apartment'),
                                React.createElement('th', { style: thStyle }, 'Actions')
                            )
                        ),
                        React.createElement('tbody', null,
                            filteredOccupants.map(occupant => 
                                React.createElement('tr', { key: occupant.id },
                                    React.createElement('td', { style: tdStyle }, 
                                        React.createElement('strong', null, occupant.name)
                                    ),
                                    React.createElement('td', { style: tdStyle }, occupant.age),
                                    React.createElement('td', { style: tdStyle }, occupant.relationship),
                                    React.createElement('td', { style: tdStyle }, occupant.phone || 'N/A'),
                                    React.createElement('td', { style: tdStyle },
                                        React.createElement('span', {
                                            style: linkStyle,
                                            onClick: () => navigate(`/admin/tenant-details/${occupant.tenant_id}`)
                                        }, occupant.tenant_name)
                                    ),
                                    React.createElement('td', { style: tdStyle }, occupant.apartment_number || 'N/A'),
                                    React.createElement('td', { style: tdStyle },
                                        React.createElement('span', {
                                            style: { ...linkStyle, color: '#3498db' },
                                            onClick: () => navigate(`/admin/tenant-details/${occupant.tenant_id}`)
                                        }, 'View Tenant')
                                    )
                                )
                            )
                        )
                    )
        )
    );
}

export default ViewAllOccupants;
