import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield, Store, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        email: role === 'super-admin' ? 'superadmin@company.com' :
          role === 'admin' ? 'manager@store1.com' : 'staff@user.com',
        role: role,
        name: role === 'super-admin' ? 'Super Admin' :
          role === 'admin' ? 'Store Manager' : 'John Employee',
        location: role === 'super-admin' ? 'All' : 'Store A'
      };
      onLogin(userData);
      navigate(
        role === 'super-admin' ? '/super-admin/dashboard' :
          role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #1e293b, #0f172a, #020617)',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '440px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--primary)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)'
          }}>
            <Shield size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '8px' }}>Attendance Portal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Secure Employee Management System</p>
        </div>

        <div className="input-group">
          <label><Mail size={14} style={{ marginRight: '8px' }} /> Email Address</label>
          <input
            type="email"
            className="input-control"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group" style={{ marginBottom: '32px' }}>
          <label><Lock size={14} style={{ marginRight: '8px' }} /> Password</label>
          <input
            type="password"
            className="input-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', marginBottom: '40px' }}
          disabled={isLoading}
          onClick={() => handleDemoLogin('user')}
        >
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </button>

        <div style={{ position: 'relative', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ borderBottom: '1px solid var(--card-border)', position: 'absolute', width: '100%', top: '50%' }}></div>
          <span style={{ background: '#1e293b', padding: '0 12px', position: 'relative', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}>DEMO ACCESS</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <button onClick={() => handleDemoLogin('super-admin')} className="btn btn-secondary">
            <Shield size={16} /> Super Admin
          </button>
          <button onClick={() => handleDemoLogin('admin')} className="btn btn-secondary">
            <Store size={16} /> Admin
          </button>
        </div>
        <button onClick={() => handleDemoLogin('staff')} className="btn btn-secondary" style={{ width: '100%' }}>
          <Users size={16} /> Staff / Employee
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
