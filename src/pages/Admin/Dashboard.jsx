import { Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = ({ user }) => {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Store Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Management for {user?.location || 'Your Location'}</p>
        </div>
        <button className="btn btn-primary">
          <Clock size={18} /> Mark Today's Attendance
        </button>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Users size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Staff</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>42</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--success)', marginBottom: '12px' }}><CheckCircle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Present Today</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>38</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--warning)', marginBottom: '12px' }}><Clock size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Late Entries</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>4</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--danger)', marginBottom: '12px' }}><AlertTriangle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Pending Attendance</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>0</h3>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px' }}>Weekly Attendance Status</h3>
        <div style={{ display: 'flex', gap: '12px', height: '200px', alignItems: 'flex-end' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '100%',
                height: `${[80, 75, 90, 85, 95, 40, 0][i]}%`,
                background: i >= 5 ? 'var(--secondary)' : 'var(--primary)',
                borderRadius: '6px',
                opacity: 0.8
              }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
