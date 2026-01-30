const bcrypt = require('bcryptjs');

async function hashPasswords() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const tenantPassword = await bcrypt.hash('tenant123', 10);
    
    console.log('Admin password hash:', adminPassword);
    console.log('Tenant password hash:', tenantPassword);
}

hashPasswords();
