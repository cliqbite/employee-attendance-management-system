import { useState } from 'react';
import { Search, Save, Clock, AlertCircle, Calendar, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AttendanceMarking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLocked, setIsLocked] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockReason, setUnlockReason] = useState('');

  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', status: 'present', ot: false, otHours: 0 },
    { id: 2, name: 'Jane Smith', status: 'present', ot: true, otHours: 2 },
    { id: 3, name: 'Robert Brown', status: 'half-day', ot: false, otHours: 0 },
    { id: 4, name: 'Alice Wilson', status: 'absent', ot: false, otHours: 0 },
    { id: 5, name: 'Michael Ross', status: null, ot: false, otHours: 0 },
  ]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // Simulation: Lock any date older than 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const selected = new Date(date);
    setIsLocked(selected < threeDaysAgo);
  };

  const handleStatusChange = (id, status) => {
    if (isLocked) return;
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, status } : emp
    ));
  };

  const handleOTToggle = (id) => {
    if (isLocked) return;
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, ot: !emp.ot, otHours: !emp.ot ? 1 : 0 } : emp
    ));
  };

  const handleOTHoursChange = (id, hours) => {
    if (isLocked) return;
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, otHours: parseFloat(hours) || 0 } : emp
    ));
  };

  const handleRequestUnlock = () => {
    alert(`Unlock request sent for ${selectedDate} with reason: ${unlockReason}`);
    setIsUnlockModalOpen(false);
    setUnlockReason('');
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Mark Attendance</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input
                type="date"
                className="input-control"
                style={{ paddingLeft: '36px', height: '36px', width: '200px' }}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            {isLocked && (
              <div style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={16} /> Attendance Locked
              </div>
            )}
            {!isLocked && (
              <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '8px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} /> Open for marking
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {isLocked ? (
            <button className="btn btn-primary" onClick={() => setIsUnlockModalOpen(true)}>
              <Lock size={18} /> Request Unlock
            </button>
          ) : (
            <button className="btn btn-primary">
              <Save size={18} /> Save Attendance
            </button>
          )}
        </div>
      </header>

      <div className={`glass-card ${isLocked ? 'locked-state' : ''}`} style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
        {isLocked && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15, 23, 42, 0.1)',
            backdropFilter: 'grayscale(100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input-control" placeholder="Filter by name..." style={{ paddingLeft: '36px', height: '36px' }} disabled={isLocked} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <th style={{ padding: '16px 24px' }}>Employee Details</th>
              <th style={{ padding: '16px 24px' }}>Attendance Status</th>
              <th style={{ padding: '16px 24px' }}>Overtime (OT)</th>
              <th style={{ padding: '16px 24px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--card-border)', opacity: isLocked ? 0.6 : 1 }}>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ fontWeight: '600' }}>{emp.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EMP-00{emp.id}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['present', 'half-day', 'absent'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(emp.id, status)}
                        disabled={isLocked}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--card-border)',
                          background: emp.status === status
                            ? (status === 'present' ? 'var(--success)' : status === 'half-day' ? 'var(--warning)' : 'var(--danger)')
                            : 'transparent',
                          color: emp.status === status ? 'white' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s',
                          textTransform: 'capitalize'
                        }}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: isLocked ? 'not-allowed' : 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="checkbox"
                        checked={emp.ot}
                        onChange={() => handleOTToggle(emp.id)}
                        disabled={isLocked}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                      />
                      Enable OT
                    </label>
                    {emp.ot && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <input
                          type="number"
                          className="input-control"
                          style={{ width: '80px', height: '32px', padding: '4px 8px' }}
                          value={emp.otHours}
                          onChange={(e) => handleOTHoursChange(emp.id, e.target.value)}
                          placeholder="Hrs"
                          disabled={isLocked}
                        />
                      </motion.div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: isLocked ? 'not-allowed' : 'pointer' }}>
                    <Clock size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unlock Request Modal */}
      <AnimatePresence>
        {isUnlockModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '400px', padding: '32px' }}
            >
              <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={24} color="var(--danger)" /> Request Unlock
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
                Attendance for <strong>{selectedDate}</strong> is locked. Please provide a reason to request an unlock from the Super Admin.
              </p>

              <div className="input-group">
                <label>Reason for Unlock</label>
                <textarea
                  className="input-control"
                  rows="4"
                  style={{ resize: 'none' }}
                  placeholder="e.g., Staff was on leave, Internet issue, etc."
                  value={unlockReason}
                  onChange={(e) => setUnlockReason(e.target.value)}
                ></textarea>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setIsUnlockModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleRequestUnlock} disabled={!unlockReason.trim()}>Send Request</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendanceMarking;
