import { useState } from 'react';
import { Clock, Users, AlertTriangle, CheckCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = ({ user }) => {
  const [isMarked, setIsMarked] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleMarkSelfAttendance = () => {
    setIsMarked(true);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 4000);
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Store Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Management for {user?.location || 'Your Location'}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isMarked ? (
            <motion.button
              key="mark-btn"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="btn btn-primary success-glow"
              onClick={handleMarkSelfAttendance}
            >
              <Send size={18} /> Mark My Attendance
            </motion.button>
          ) : (
            <motion.div
              key="done-badge"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="done-badge"
            >
              <CheckCircle size={18} /> Personal Attendance Marked
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
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your personal attendance has been recorded.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Users size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Staff</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>42</h3>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--success)', marginBottom: '12px' }}><CheckCircle size={24} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Present Today</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{isMarked ? '39' : '38'}</h3>
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
