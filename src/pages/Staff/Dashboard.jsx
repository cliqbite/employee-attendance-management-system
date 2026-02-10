import { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StaffDashboard = ({ user }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleMarkAttendance = () => {
    setIsMarked(true);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 4000);
  };

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
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>My Attendance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isMarked ? (
            <motion.button
              key="mark-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="btn btn-primary success-glow"
              onClick={handleMarkAttendance}
              style={{ padding: '12px 24px', borderRadius: '12px' }}
            >
              <Send size={18} /> Mark Today's Attendance
            </motion.button>
          ) : (
            <motion.div
              key="done-badge"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="done-badge"
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              <CheckCircle size={20} /> Attendance Marked for Today
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Success Feedback Overlay */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              bottom: '40px',
              right: '40px',
              zIndex: 100,
              background: 'rgba(16, 185, 129, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '16px 24px',
              borderRadius: '16px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <CheckCircle size={24} />
            <div>
              <p style={{ fontWeight: '700' }}>Success!</p>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your attendance for today has been recorded.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--success)', marginBottom: '12px' }}><CheckCircle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Days Present</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{isMarked ? '19' : '18'}/22</h3>
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
            {isMarked && (
              <tr style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem', background: 'rgba(16, 185, 129, 0.05)' }}>
                <td style={{ padding: '12px' }}>{new Date().toISOString().split('T')[0]}</td>
                <td style={{ padding: '12px' }}>
                  <span className="badge badge-success">Present</span>
                </td>
                <td style={{ padding: '12px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td style={{ padding: '12px' }}>0h</td>
              </tr>
            )}
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
