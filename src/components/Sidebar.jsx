import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  Lock,
  FileText,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  const menuItems = user?.role === 'super-admin'
    ? [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/super-admin/dashboard' },
      { icon: <Users size={20} />, label: 'Employees', path: '/super-admin/employees' },
      { icon: <Lock size={20} />, label: 'Unlock Requests', path: '/super-admin/unlock-requests' },
      { icon: <FileText size={20} />, label: 'Reports', path: '/super-admin/reports' },
    ]
    : [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
      { icon: <Clock size={20} />, label: 'Attendance', path: '/admin/attendance' },
      { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
    ];

  return (
    <div style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--card-border)',
      background: 'rgba(15, 23, 42, 0.8)',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
          <Clock size={18} color="white" style={{ margin: '0 auto' }} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>AMS Portal</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: '12px',
              color: isActive ? 'white' : 'var(--text-muted)',
              background: isActive ? 'var(--primary)' : 'transparent',
              textDecoration: 'none',
              marginBottom: '8px',
              transition: 'all 0.2s',
              gap: '12px',
              fontSize: '0.925rem'
            })}
          >
            {item.icon}
            <span style={{ flex: 1 }}>{item.label}</span>
            <ChevronRight size={14} style={{ opacity: 0.5 }} />
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="btn btn-secondary"
        style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'transparent' }}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
