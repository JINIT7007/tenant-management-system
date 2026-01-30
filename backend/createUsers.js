const bcrypt = require('bcryptjs');
const db = require('./config/database');

async function createUsers() {
    try {
        // Hash passwords
        const adminPassword = await bcrypt.hash('admin123', 10);
        const tenantPassword = await bcrypt.hash('tenant123', 10);

        // Create admin user
        await db.query(
            'INSERT INTO users (email, password, role, full_name, phone) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
            ['admin@test.com', adminPassword, 'admin', 'Admin User', '1234567890']
        );
        console.log('✅ Admin created: admin@test.com / admin123');

        // Create tenant user
        await db.query(
            'INSERT INTO users (email, password, role, full_name, phone) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
            ['tenant@test.com', tenantPassword, 'tenant', 'John Doe', '9876543210']
        );
        console.log('✅ Tenant created: tenant@test.com / tenant123');

        console.log('\n🎉 Users created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createUsers();
