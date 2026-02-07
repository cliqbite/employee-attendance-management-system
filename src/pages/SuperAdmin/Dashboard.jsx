import { Users, MapPin, Lock, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ translateY: -5 }}
    className="glass-card"
    style={{ padding: '24px', flex: 1 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: `rgba(${color}, 0.1)`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: `rgb(${color})`
      }}>
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
      </div>
    </div>
  </motion.div>
);

const SuperAdminDashboard = () => {
  const stats = [
    { icon: <Users size={24} />, label: 'Total Employees', value: '1,248', color: '37, 99, 235' },
    { icon: <MapPin size={24} />, label: 'Active Locations', value: '12', color: '14, 165, 233' },
    { icon: <Lock size={24} />, label: 'Unlock Requests', value: '8', color: '245, 158, 11' },
    { icon: <FileCheck size={24} />, label: 'Attendance Rate', value: '94%', color: '16, 185, 129' },
  ];

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>System-wide attendance and employee metrics</p>
      </header>

      <div className="dashboard-grid">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Recent Attendance Activity</h3>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <th style={{ padding: '12px' }}>Employee</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '12px' }}>Employee {i + 1}</td>
                  <td style={{ padding: '12px' }}>Store {String.fromCharCode(65 + i)}</td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success">Present</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>09:15 AM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>Pending Unlocks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Store {String.fromCharCode(67 + i)}</span>
                  <span style={{ color: 'var(--warning)', fontSize: '0.75rem' }}>Locked 2d ago</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Attendance for Jan 24, 2024</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
