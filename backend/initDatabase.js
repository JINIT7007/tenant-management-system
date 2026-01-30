const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
    console.log('📦 Connected to database');
});

async function initDatabase() {
    console.log('🔧 Initializing database...\n');

    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            full_name TEXT,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating users table:', err);
        } else {
            console.log('✅ Users table created');
        }
    });

    // Create tenants table
    db.run(`
        CREATE TABLE IF NOT EXISTS tenants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            apartment_id INTEGER,
            lease_start DATE,
            lease_end DATE,
            rent_amount DECIMAL(10,2),
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (apartment_id) REFERENCES apartments(id)
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating tenants table:', err);
        } else {
            console.log('✅ Tenants table created');
        }
    });

    // Create apartments table
    db.run(`
        CREATE TABLE IF NOT EXISTS apartments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            apartment_number TEXT UNIQUE NOT NULL,
            floor INTEGER NOT NULL,
            bedrooms INTEGER,
            bathrooms INTEGER,
            square_feet INTEGER,
            rent_amount DECIMAL(10,2),
            status TEXT DEFAULT 'available',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error creating apartments table:', err);
        } else {
            console.log('✅ Apartments table created');
        }
    });

    // Create occupants table
    db.run(`
        CREATE TABLE IF NOT EXISTS occupants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tenant_id INTEGER NOT NULL,
            full_name TEXT NOT NULL,
            relationship TEXT,
            age INTEGER,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
        )
    `, async (err) => {
        if (err) {
            console.error('❌ Error creating occupants table:', err);
        } else {
            console.log('✅ Occupants table created\n');
            
            // Create admin user
            const adminPassword = await bcrypt.hash('admin123', 10);
            db.run(`
                INSERT OR IGNORE INTO users (email, password, role, full_name, phone)
                VALUES (?, ?, ?, ?, ?)
            `, ['admin@test.com', adminPassword, 'admin', 'Admin User', '1234567890'], (err) => {
                if (err) {
                    console.error('❌ Error creating admin user:', err);
                } else {
                    console.log('✅ Admin user created');
                    console.log('   📧 Email: admin@test.com');
                    console.log('   🔑 Password: admin123\n');
                }
            });

            // Create tenant user
            const tenantPassword = await bcrypt.hash('tenant123', 10);
            db.run(`
                INSERT OR IGNORE INTO users (email, password, role, full_name, phone)
                VALUES (?, ?, ?, ?, ?)
            `, ['tenant@test.com', tenantPassword, 'tenant', 'Demo Tenant', '9876543210'], (err) => {
                if (err) {
                    console.error('❌ Error creating tenant user:', err);
                } else {
                    console.log('✅ Tenant user created');
                    console.log('   📧 Email: tenant@test.com');
                    console.log('   🔑 Password: tenant123\n');
                }
                
                console.log('🎉 Database initialization complete!\n');
                db.close();
                process.exit(0);
            });
        }
    });
}

initDatabase();
