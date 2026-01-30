import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Dashboard from './components/Admin/Dashboard';
import TenantList from './components/Admin/TenantList';
import AddTenant from './components/Admin/AddTenant';
import ApartmentList from './components/Admin/ApartmentList';
import AddApartment from './components/Admin/AddApartment';
import OccupantList from './components/Admin/OccupantList';
import TenantDashboard from './components/Tenant/TenantDashboard';
import TenantProfile from './components/Tenant/TenantProfile';
import TenantOccupants from './components/Tenant/TenantOccupants';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/tenants" element={<TenantList />} />
        <Route path="/admin/tenants/add" element={<AddTenant />} />
        <Route path="/admin/apartments" element={<ApartmentList />} />
        <Route path="/admin/apartments/add" element={<AddApartment />} />
        <Route path="/admin/occupants" element={<OccupantList />} />
        
        {/* Tenant Routes */}
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/profile" element={<TenantProfile />} />
        <Route path="/tenant/occupants" element={<TenantOccupants />} />
      </Routes>
    </Router>
  );
}

export default App;
