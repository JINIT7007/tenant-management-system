const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('🔵 Login attempt:', email); // DEBUG

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        console.log('🔵 Users found:', users.length); // DEBUG

        if (users.length === 0) {
            console.log('❌ User not found'); // DEBUG
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        
        console.log('🔵 Comparing passwords...'); // DEBUG

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        console.log('🔵 Password match:', isPasswordValid); // DEBUG

        if (!isPasswordValid) {
            console.log('❌ Invalid password'); // DEBUG
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('✅ Login successful!'); // DEBUG

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
