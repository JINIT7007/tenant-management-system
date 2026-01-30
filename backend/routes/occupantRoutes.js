const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all occupants
router.get('/', async (req, res) => {
    try {
        const [occupants] = await db.query('SELECT * FROM occupants ORDER BY full_name');
        res.json(occupants);
    } catch (error) {
        console.error('Error fetching occupants:', error);
        res.status(500).json({ message: 'Error fetching occupants' });
    }
});

// Get occupant by ID
router.get('/:id', async (req, res) => {
    try {
        const [occupants] = await db.query('SELECT * FROM occupants WHERE id = ?', [req.params.id]);
        if (occupants.length === 0) {
            return res.status(404).json({ message: 'Occupant not found' });
        }
        res.json(occupants[0]);
    } catch (error) {
        console.error('Error fetching occupant:', error);
        res.status(500).json({ message: 'Error fetching occupant' });
    }
});

// Get occupants by tenant ID
router.get('/tenant/:tenantId', async (req, res) => {
    try {
        const [occupants] = await db.query('SELECT * FROM occupants WHERE tenant_id = ?', [req.params.tenantId]);
        res.json(occupants);
    } catch (error) {
        console.error('Error fetching occupants:', error);
        res.status(500).json({ message: 'Error fetching occupants' });
    }
});

// Create occupant
router.post('/', async (req, res) => {
    try {
        const { tenant_id, full_name, relationship, age, phone } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO occupants (tenant_id, full_name, relationship, age, phone) VALUES (?, ?, ?, ?, ?)',
            [tenant_id, full_name, relationship || null, age || null, phone || null]
        );
        
        res.status(201).json({ 
            message: 'Occupant created successfully',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error creating occupant:', error);
        res.status(500).json({ message: 'Error creating occupant', error: error.message });
    }
});

// Update occupant
router.put('/:id', async (req, res) => {
    try {
        const { tenant_id, full_name, relationship, age, phone } = req.body;
        
        await db.query(
            'UPDATE occupants SET tenant_id = ?, full_name = ?, relationship = ?, age = ?, phone = ? WHERE id = ?',
            [tenant_id, full_name, relationship, age, phone, req.params.id]
        );
        
        res.json({ message: 'Occupant updated successfully' });
    } catch (error) {
        console.error('Error updating occupant:', error);
        res.status(500).json({ message: 'Error updating occupant' });
    }
});

// Delete occupant
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM occupants WHERE id = ?', [req.params.id]);
        res.json({ message: 'Occupant deleted successfully' });
    } catch (error) {
        console.error('Error deleting occupant:', error);
        res.status(500).json({ message: 'Error deleting occupant' });
    }
});

module.exports = router;
