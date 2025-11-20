import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard';
import TenantDashboard from './pages/TenantDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider> {/* Added DataProvider */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Owner Routes */}
              <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
                <Route path="owner" element={<OwnerDashboard />} />
              </Route>

              {/* Tenant Routes */}
              <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
                <Route path="tenant" element={<TenantDashboard />} />
              </Route>
            </Route>
          </Routes>
        </DataProvider> {/* Closed DataProvider */}
      </AuthProvider>
    </Router>
  );
}

export default App;
