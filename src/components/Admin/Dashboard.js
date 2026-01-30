import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, apartmentAPI, occupantAPI } from '../../services/api';
import Header from '../Header';

function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalTenants: 0,
        totalApartments: 0,
        occupiedApartments: 0,
        totalOccupants: 0
    });
    const [apartments, setApartments] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const apartmentsData = await apartmentAPI.getAll();
            const tenantsData = await tenantAPI.getAll();
            const occupantsData = await occupantAPI.getAll();
            
            // Calculate stats manually
            const statsData = {
                totalTenants: tenantsData.length,
                totalApartments: apartmentsData.length,
                occupiedApartments: apartmentsData.filter(apt => apt.status === 'occupied').length,
                totalOccupants: occupantsData.length
            };
            
            setStats(statsData);
            setApartments(apartmentsData);
            setTenants(tenantsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const occupancyRate = stats.totalApartments > 0 
        ? ((stats.occupiedApartments / stats.totalApartments) * 100).toFixed(1) 
        : 0;

    const availableApartments = stats.totalApartments - stats.occupiedApartments;

    // Get recent tenants (last 5)
    const recentTenants = tenants.slice(0, 5);

    // Get apartments by floor for distribution
    const floorDistribution = apartments.reduce((acc, apt) => {
        acc[apt.floor] = (acc[apt.floor] || 0) + 1;
        return acc;
    }, {});

    const containerStyle = {
        background: '#f5f5f5',
        minHeight: '100vh'
    };

    const contentStyle = {
        padding: '40px'
    };

    const headerStyle = {
        marginBottom: '30px'
    };

    const titleStyle = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '8px'
    };

    const subtitleStyle = {
        fontSize: '16px',
        color: '#7f8c8d'
    };

    const statsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '30px'
    };

    const statCardStyle = (color) => ({
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${color}`,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
    });

    const statNumberStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '8px'
    };

    const statLabelStyle = {
        fontSize: '14px',
        color: '#7f8c8d',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: 'bold'
    };

    const chartsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '30px'
    };

    const chartCardStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const chartTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: '20px'
    };

    const progressBarContainerStyle = {
        width: '100%',
        height: '40px',
        background: '#ecf0f1',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '12px'
    };

    const progressBarFillStyle = (percentage, color) => ({
        width: `${percentage}%`,
        height: '100%',
        background: color,
        transition: 'width 1s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px'
    });

    const progressLabelStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#7f8c8d',
        marginTop: '8px'
    };

    const barChartStyle = {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        height: '200px',
        marginTop: '20px'
    };

    const barStyle = (height, color) => ({
        flex: 1,
        height: `${height}%`,
        background: color,
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '8px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        minHeight: '30px'
    });

    const barLabelStyle = {
        textAlign: 'center',
        marginTop: '8px',
        fontSize: '12px',
        color: '#2c3e50',
        fontWeight: 'bold'
    };

    const recentListStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const listItemStyle = {
        padding: '16px',
        borderBottom: '1px solid #ecf0f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    const listItemNameStyle = {
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const listItemDetailStyle = {
        fontSize: '13px',
        color: '#7f8c8d',
        marginTop: '4px'
    };

    const badgeStyle = {
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold'
    };

    const viewAllButtonStyle = {
        width: '100%',
        padding: '12px',
        marginTop: '16px',
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
                React.createElement('p', null, 'Loading dashboard...')
            )
        );
    }

    return React.createElement('div', { style: containerStyle },
        React.createElement(Header),
        
        React.createElement('div', { style: contentStyle },
            React.createElement('div', { style: headerStyle },
                React.createElement('h1', { style: titleStyle }, '📊 Admin Dashboard'),
                React.createElement('p', { style: subtitleStyle }, 
                    `Welcome back! Here's what's happening with your properties.`
                )
            ),

            // Stats Cards
            React.createElement('div', { style: statsGridStyle },
                React.createElement('div', { 
                    style: statCardStyle('#667eea'),
                    onClick: () => navigate('/admin/tenants'),
                    onMouseEnter: (e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }
                },
                    React.createElement('div', { style: statNumberStyle }, stats.totalTenants),
                    React.createElement('div', { style: statLabelStyle }, '👥 Total Tenants')
                ),

                React.createElement('div', { 
                    style: statCardStyle('#f39c12'),
                    onClick: () => navigate('/admin/apartments'),
                    onMouseEnter: (e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }
                },
                    React.createElement('div', { style: statNumberStyle }, stats.totalApartments),
                    React.createElement('div', { style: statLabelStyle }, '🏢 Total Apartments')
                ),

                React.createElement('div', { 
                    style: statCardStyle('#27ae60'),
                    onClick: () => navigate('/admin/apartments'),
                    onMouseEnter: (e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }
                },
                    React.createElement('div', { style: statNumberStyle }, stats.occupiedApartments),
                    React.createElement('div', { style: statLabelStyle }, '✅ Occupied')
                ),

                React.createElement('div', { 
                    style: statCardStyle('#e74c3c'),
                    onClick: () => navigate('/admin/occupants'),
                    onMouseEnter: (e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }
                },
                    React.createElement('div', { style: statNumberStyle }, stats.totalOccupants),
                    React.createElement('div', { style: statLabelStyle }, '👨‍👩‍👧‍👦 Total Occupants')
                )
            ),

            // Charts Section
            React.createElement('div', { style: chartsGridStyle },
                // Occupancy Rate Chart
                React.createElement('div', { style: chartCardStyle },
                    React.createElement('h3', { style: chartTitleStyle }, '📈 Occupancy Rate'),
                    React.createElement('div', { style: progressBarContainerStyle },
                        React.createElement('div', { 
                            style: progressBarFillStyle(occupancyRate, '#667eea')
                        }, `${occupancyRate}%`)
                    ),
                    React.createElement('div', { style: progressLabelStyle },
                        React.createElement('span', null, 
                            `${stats.occupiedApartments} Occupied`
                        ),
                        React.createElement('span', null, 
                            `${availableApartments} Available`
                        )
                    ),
                    React.createElement('div', { style: { marginTop: '20px', fontSize: '14px', color: '#7f8c8d' } },
                        React.createElement('p', null, 
                            `Your building is ${occupancyRate >= 80 ? '🎉 performing excellently' : occupancyRate >= 50 ? '👍 doing well' : '⚠️ has availability'} with ${occupancyRate}% occupancy rate.`
                        )
                    )
                ),

                // Apartments by Floor Chart
                React.createElement('div', { style: chartCardStyle },
                    React.createElement('h3', { style: chartTitleStyle }, '🏢 Apartments by Floor'),
                    React.createElement('div', { style: barChartStyle },
                        Object.keys(floorDistribution).sort((a, b) => a - b).map(floor => {
                            const count = floorDistribution[floor];
                            const maxCount = Math.max(...Object.values(floorDistribution));
                            const heightPercentage = (count / maxCount) * 100;
                            
                            return React.createElement('div', { 
                                key: floor,
                                style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }
                            },
                                React.createElement('div', { 
                                    style: barStyle(heightPercentage, '#667eea')
                                }, count),
                                React.createElement('div', { style: barLabelStyle }, `Floor ${floor}`)
                            );
                        })
                    )
                )
            ),

            // Recent Tenants List
            React.createElement('div', { style: recentListStyle },
                React.createElement('h3', { style: chartTitleStyle }, '👥 Recent Tenants'),
                recentTenants.length === 0 
                    ? React.createElement('p', { style: { textAlign: 'center', color: '#95a5a6', padding: '20px' } },
                        'No tenants yet'
                    )
                    : recentTenants.map((tenant, index) => 
                        React.createElement('div', { 
                            key: tenant.id,
                            style: {
                                ...listItemStyle,
                                borderBottom: index === recentTenants.length - 1 ? 'none' : '1px solid #ecf0f1'
                            },
                            onClick: () => navigate(`/admin/tenant-details/${tenant.id}`),
                            onMouseEnter: (e) => e.currentTarget.style.background = '#f8f9fa',
                            onMouseLeave: (e) => e.currentTarget.style.background = 'white'
                        },
                            React.createElement('div', null,
                                React.createElement('div', { style: listItemNameStyle }, tenant.full_name),
                                React.createElement('div', { style: listItemDetailStyle }, 
                                    tenant.apartment_number 
                                        ? `Apartment ${tenant.apartment_number}` 
                                        : 'No apartment assigned'
                                )
                            ),
                            React.createElement('div', { 
                                style: {
                                    ...badgeStyle,
                                    background: tenant.status === 'active' ? '#d4edda' : '#f8d7da',
                                    color: tenant.status === 'active' ? '#155724' : '#721c24'
                                }
                            }, tenant.status ? tenant.status.toUpperCase() : 'N/A')
                        )
                    ),
                React.createElement('button', { 
                    style: viewAllButtonStyle,
                    onClick: () => navigate('/admin/tenants'),
                    onMouseEnter: (e) => e.target.style.background = '#5568d3',
                    onMouseLeave: (e) => e.target.style.background = '#667eea'
                }, 'View All Tenants →')
            )
        )
    );
}

export default Dashboard;
