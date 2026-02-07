import { useState } from 'react';
import { Lock, Shield, User, Save, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ user }) => {
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords don't match!");
      return;
    }
    setIsUpdating(true);
    setTimeout(() => {
      alert("Password updated successfully!");
      setIsUpdating(false);
      setPasswords({ old: '', new: '', confirm: '' });
    }, 1500);
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your profile and security preferences</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
        {/* Profile Card */}
        <div className="glass-card" style={{ padding: '32px', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--primary)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'white'
            }}>
              <User size={40} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{user?.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user?.role === 'super-admin' ? 'Super Administrator' : `Store Manager - ${user?.location}`}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Address</p>
              <p style={{ fontSize: '0.875rem' }}>{user?.email}</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Role</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} color="var(--primary)" />
                <p style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{user?.role.replace('-', ' ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Reset Card */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={20} color="var(--primary)" /> Reset Password
          </h3>

          <form onSubmit={handleUpdatePassword}>
            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                className="input-control"
                placeholder="••••••••"
                value={passwords.old}
                onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="••••••••"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '12px', padding: '16px', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '12px', marginBottom: '24px' }}>
              <ul style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '16px' }}>
                <li>Minimum 4 characters (recommended 8+)</li>
                <li>Include at least one special character</li>
              </ul>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
