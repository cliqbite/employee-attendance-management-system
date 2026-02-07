import { useState } from 'react';
import { Search, Save, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AttendanceMarking = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', status: 'present', ot: false, otHours: 0 },
    { id: 2, name: 'Jane Smith', status: 'present', ot: true, otHours: 2 },
    { id: 3, name: 'Robert Brown', status: 'half-day', ot: false, otHours: 0 },
    { id: 4, name: 'Alice Wilson', status: 'absent', ot: false, otHours: 0 },
    { id: 5, name: 'Michael Ross', status: null, ot: false, otHours: 0 },
  ]);

  const handleStatusChange = (id, status) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, status } : emp
    ));
  };

  const handleOTToggle = (id) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, ot: !emp.ot, otHours: !emp.ot ? 1 : 0 } : emp
    ));
  };

  const handleOTHoursChange = (id, hours) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, otHours: parseFloat(hours) || 0 } : emp
    ));
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Mark Attendance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Date: {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> Locked in 48h
          </div>
          <button className="btn btn-primary">
            <Save size={18} /> Save Attendance
          </button>
        </div>
      </header>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input-control" placeholder="Filter by name..." style={{ paddingLeft: '36px', height: '36px' }} />
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
              <tr key={emp.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
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
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--card-border)',
                          background: emp.status === status
                            ? (status === 'present' ? 'var(--success)' : status === 'half-day' ? 'var(--warning)' : 'var(--danger)')
                            : 'transparent',
                          color: emp.status === status ? 'white' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
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
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="checkbox"
                        checked={emp.ot}
                        onChange={() => handleOTToggle(emp.id)}
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
                        />
                      </motion.div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Clock size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceMarking;
