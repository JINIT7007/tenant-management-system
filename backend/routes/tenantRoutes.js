const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tenants
router.get('/', async (req, res) => {
    try {
        const [tenants] = await db.query(`
            SELECT t.*, a.apartment_number 
            FROM tenants t
            LEFT JOIN apartments a ON t.apartment_id = a.id
            WHERE t.status = 'active'
        `);
        res.json(tenants);
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get statistics
router.get('/statistics', async (req, res) => {
    try {
        const [tenantCount] = await db.query(
            'SELECT COUNT(*) as count FROM tenants WHERE status = ?',
            ['active']
        );

        const [apartmentCount] = await db.query(
            'SELECT COUNT(*) as count FROM apartments'
        );

        const [occupiedCount] = await db.query(
            'SELECT COUNT(*) as count FROM apartments WHERE status = ?',
            ['occupied']
        );

        const [occupantCount] = await db.query(
            'SELECT COUNT(*) as count FROM occupants'
        );

        res.json({
            totalTenants: tenantCount[0].count,
            totalApartments: apartmentCount[0].count,
            occupiedApartments: occupiedCount[0].count,
            totalOccupants: occupantCount[0].count
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single tenant by ID
router.get('/:id', async (req, res) => {
    try {
        const [tenants] = await db.query(`
            SELECT t.*, a.apartment_number 
            FROM tenants t
            LEFT JOIN apartments a ON t.apartment_id = a.id
            WHERE t.id = ?
        `, [req.params.id]);

        if (tenants.length === 0) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json(tenants[0]);
    } catch (error) {
        console.error('Error fetching tenant:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get tenant with occupants
router.get('/:id/details', async (req, res) => {
    try {
        const [tenants] = await db.query(`
            SELECT t.*, a.apartment_number, a.status as apartment_status
            FROM tenants t
            LEFT JOIN apartments a ON t.apartment_id = a.id
            WHERE t.id = ?
        `, [req.params.id]);

        if (tenants.length === 0) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        const [occupants] = await db.query(
            'SELECT * FROM occupants WHERE tenant_id = ?',
            [req.params.id]
        );

        const tenant = tenants[0];
        tenant.occupants = occupants;

        res.json(tenant);
    } catch (error) {
        console.error('Error fetching tenant details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new tenant
router.post('/', async (req, res) => {
    try {
        const { full_name, apartment_id, email, phone, occupation, move_in_date } = req.body;

        const [result] = await db.query(
            'INSERT INTO tenants (full_name, apartment_id, email, phone, occupation, move_in_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [full_name, apartment_id || null, email, phone, occupation, move_in_date, 'active']
        );

        // If apartment assigned, update apartment status to occupied
        if (apartment_id) {
            await db.query(
                'UPDATE apartments SET status = ? WHERE id = ?',
                ['occupied', apartment_id]
            );
        }

        res.status(201).json({ 
            message: 'Tenant created successfully', 
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error creating tenant:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update tenant (including apartment reassignment)
router.put('/:id', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        const { full_name, email, phone, occupation, apartment_id } = req.body;
        const tenantId = req.params.id;

        // Get current tenant info
        const [currentTenant] = await connection.query(
            'SELECT apartment_id FROM tenants WHERE id = ?',
            [tenantId]
        );

        const oldApartmentId = currentTenant[0].apartment_id;
        const newApartmentId = apartment_id || null;

        // Update tenant information
        await connection.query(
            'UPDATE tenants SET full_name = ?, email = ?, phone = ?, occupation = ?, apartment_id = ? WHERE id = ?',
            [full_name, email, phone, occupation, newApartmentId, tenantId]
        );

        // If apartment changed, update apartment statuses
        if (oldApartmentId !== newApartmentId) {
            // Set old apartment to available (if it exists)
            if (oldApartmentId) {
                await connection.query(
                    'UPDATE apartments SET status = ? WHERE id = ?',
                    ['available', oldApartmentId]
                );
            }

            // Set new apartment to occupied (if it exists)
            if (newApartmentId) {
                await connection.query(
                    'UPDATE apartments SET status = ? WHERE id = ?',
                    ['occupied', newApartmentId]
                );
            }
        }

        await connection.commit();
        res.json({ message: 'Tenant updated successfully' });

    } catch (error) {
        await connection.rollback();
        console.error('Error updating tenant:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        connection.release();
    }
});

// Assign/Reassign apartment to tenant (NEW ENDPOINT)
router.put('/:id/assign-apartment', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        const { apartment_id } = req.body;
        const tenantId = req.params.id;

        // Get current apartment of tenant
        const [currentTenant] = await connection.query(
            'SELECT apartment_id FROM tenants WHERE id = ?',
            [tenantId]
        );

        if (currentTenant.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Tenant not found' });
        }

        const oldApartmentId = currentTenant[0].apartment_id;

        // If removing apartment (apartment_id is null)
        if (!apartment_id) {
            // Update tenant
            await connection.query(
                'UPDATE tenants SET apartment_id = NULL WHERE id = ?',
                [tenantId]
            );

            // Set old apartment to available
            if (oldApartmentId) {
                await connection.query(
                    'UPDATE apartments SET status = ? WHERE id = ?',
                    ['available', oldApartmentId]
                );
            }

            await connection.commit();
            return res.json({ message: 'Apartment unassigned successfully' });
        }

        // Check if new apartment is available
        const [newApartment] = await connection.query(
            'SELECT status FROM apartments WHERE id = ?',
            [apartment_id]
        );

        if (newApartment.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Apartment not found' });
        }

        if (newApartment[0].status === 'occupied' && apartment_id !== oldApartmentId) {
            await connection.rollback();
            return res.status(400).json({ message: 'Apartment is already occupied' });
        }

        // Update tenant's apartment
        await connection.query(
            'UPDATE tenants SET apartment_id = ? WHERE id = ?',
            [apartment_id, tenantId]
        );

        // Set old apartment to available (if different from new)
        if (oldApartmentId && oldApartmentId !== apartment_id) {
            await connection.query(
                'UPDATE apartments SET status = ? WHERE id = ?',
                ['available', oldApartmentId]
            );
        }

        // Set new apartment to occupied
        await connection.query(
            'UPDATE apartments SET status = ? WHERE id = ?',
            ['occupied', apartment_id]
        );

        await connection.commit();
        res.json({ message: 'Apartment assigned successfully' });

    } catch (error) {
        await connection.rollback();
        console.error('Error assigning apartment:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        connection.release();
    }
});

// Delete (deactivate) tenant
router.delete('/:id', async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        // Get tenant's apartment
        const [tenant] = await connection.query(
            'SELECT apartment_id FROM tenants WHERE id = ?',
            [req.params.id]
        );

        if (tenant.length > 0 && tenant[0].apartment_id) {
            // Set apartment to available
            await connection.query(
                'UPDATE apartments SET status = ? WHERE id = ?',
                ['available', tenant[0].apartment_id]
            );
        }

        // Deactivate tenant
        await connection.query(
            'UPDATE tenants SET status = ?, apartment_id = NULL WHERE id = ?',
            ['inactive', req.params.id]
        );

        await connection.commit();
        res.json({ message: 'Tenant deactivated successfully' });

    } catch (error) {
        await connection.rollback();
        console.error('Error deleting tenant:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        connection.release();
    }
});

module.exports = router;
