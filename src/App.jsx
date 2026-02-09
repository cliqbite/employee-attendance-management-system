import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';
import AttendanceMarking from './pages/Admin/Attendance';
import EmployeeTable from './pages/SuperAdmin/Employees';
import UnlockRequests from './pages/SuperAdmin/UnlockRequests';
import Reports from './pages/SuperAdmin/Reports';
import Settings from './pages/Settings';
import StaffDashboard from './pages/Staff/Dashboard';
import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? (
            <Navigate to={
              user.role === 'super-admin' ? '/super-admin/dashboard' :
                user.role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'
            } />
          ) : <Login onLogin={handleLogin} />
        } />

        <Route
          path="/super-admin/*"
          element={
            user?.role === 'super-admin' ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<SuperAdminDashboard />} />
                  <Route path="employees" element={<EmployeeTable />} />
                  <Route path="unlock-requests" element={<UnlockRequests />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings user={user} />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/*"
          element={
            user?.role === 'admin' ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard user={user} />} />
                  <Route path="attendance" element={<AttendanceMarking />} />
                  <Route path="settings" element={<Settings user={user} />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route
          path="/staff/*"
          element={
            user?.role === 'staff' ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<StaffDashboard user={user} />} />
                  <Route path="settings" element={<Settings user={user} />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
