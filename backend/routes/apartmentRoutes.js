const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all apartments
router.get('/', async (req, res) => {
    try {
        const [apartments] = await db.query('SELECT * FROM apartments ORDER BY apartment_number');
        res.json(apartments);
    } catch (error) {
        console.error('Error fetching apartments:', error);
        res.status(500).json({ message: 'Error fetching apartments' });
    }
});

// Get apartment by ID
router.get('/:id', async (req, res) => {
    try {
        const [apartments] = await db.query('SELECT * FROM apartments WHERE id = ?', [req.params.id]);
        if (apartments.length === 0) {
            return res.status(404).json({ message: 'Apartment not found' });
        }
        res.json(apartments[0]);
    } catch (error) {
        console.error('Error fetching apartment:', error);
        res.status(500).json({ message: 'Error fetching apartment' });
    }
});

// Create apartment
router.post('/', async (req, res) => {
    try {
        const { apartment_number, floor, bedrooms, bathrooms, square_feet, rent_amount, status } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO apartments (apartment_number, floor, bedrooms, bathrooms, square_feet, rent_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [apartment_number, floor, bedrooms || null, bathrooms || null, square_feet || null, rent_amount || null, status || 'available']
        );
        
        res.status(201).json({ 
            message: 'Apartment created successfully',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error creating apartment:', error);
        res.status(500).json({ message: 'Error creating apartment', error: error.message });
    }
});

// Update apartment
router.put('/:id', async (req, res) => {
    try {
        const { apartment_number, floor, bedrooms, bathrooms, square_feet, rent_amount, status } = req.body;
        
        await db.query(
            'UPDATE apartments SET apartment_number = ?, floor = ?, bedrooms = ?, bathrooms = ?, square_feet = ?, rent_amount = ?, status = ? WHERE id = ?',
            [apartment_number, floor, bedrooms, bathrooms, square_feet, rent_amount, status, req.params.id]
        );
        
        res.json({ message: 'Apartment updated successfully' });
    } catch (error) {
        console.error('Error updating apartment:', error);
        res.status(500).json({ message: 'Error updating apartment' });
    }
});

// Delete apartment
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM apartments WHERE id = ?', [req.params.id]);
        res.json({ message: 'Apartment deleted successfully' });
    } catch (error) {
        console.error('Error deleting apartment:', error);
        res.status(500).json({ message: 'Error deleting apartment' });
    }
});

module.exports = router;
