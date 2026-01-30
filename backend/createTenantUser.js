const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
    console.log('📦 Connected to database');
});

async function createTenantUser() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('tenant123', 10);
        
        // Insert tenant user
        const query = `
            INSERT INTO users (email, password, role, full_name, phone) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        db.run(query, [
            'tenant@test.com',
            hashedPassword,
            'tenant',
            'Demo Tenant',
            '9876543210'
        ], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('⚠️  Tenant user already exists!');
                    console.log('📧 Email: tenant@test.com');
                    console.log('🔑 Password: tenant123');
                } else {
                    console.error('❌ Error creating tenant user:', err.message);
                }
            } else {
                console.log('✅ Tenant user created successfully!');
                console.log('📧 Email: tenant@test.com');
                console.log('🔑 Password: tenant123');
            }
            db.close();
            process.exit();
        });
    } catch (error) {
        console.error('❌ Error:', error);
        db.close();
        process.exit(1);
    }
}

createTenantUser();
