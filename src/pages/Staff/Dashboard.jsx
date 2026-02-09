import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const StaffDashboard = ({ user }) => {
  const attendanceData = [
    { date: '2024-02-05', status: 'Present', checkIn: '09:05 AM', ot: '0h' },
    { date: '2024-02-04', status: 'Present', checkIn: '08:55 AM', ot: '2h' },
    { date: '2024-02-03', status: 'Half Day', checkIn: '09:15 AM', ot: '0h' },
    { date: '2024-02-02', status: 'Present', checkIn: '09:02 AM', ot: '1h' },
    { date: '2024-02-01', status: 'Absent', checkIn: '-', ot: '0h' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return 'badge-success';
      case 'Half Day': return 'badge-warning';
      case 'Absent': return 'badge-danger';
      case 'Public Holiday': return 'badge-teal';
      case 'Sick Leave': return 'badge-warning';
      case 'Vacation': return 'badge-purple';
      case 'Leave': return 'badge-slate';
      default: return 'badge-slate';
    }
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>My Attendance</h1>
        <p style={{ color: 'var(--text-muted)' }}>Viewing attendance history for {user?.name}</p>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--success)', marginBottom: '12px' }}><CheckCircle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Days Present</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>18/22</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Clock size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total OT Hours</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>12.5h</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--warning)', marginBottom: '12px' }}><AlertTriangle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pending Lock Fixes</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>1</h3>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>Recent History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Check-In</th>
              <th style={{ padding: '12px' }}>OT</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem' }}>
                <td style={{ padding: '12px' }}>{row.date}</td>
                <td style={{ padding: '12px' }}>
                  <span className={`badge ${getStatusBadge(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{row.checkIn}</td>
                <td style={{ padding: '12px' }}>{row.ot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;
