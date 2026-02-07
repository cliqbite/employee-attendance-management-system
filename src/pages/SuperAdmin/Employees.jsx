import { useState } from 'react';
import {
  Plus,
  Search,
  Download,
  Upload,
  Edit2,
  Trash2,
  MoreVertical,
  Filter,
  UserCheck,
  UserX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for initial UI
  const [employees] = useState([
    { id: 101, name: 'Arjun Mehta', email: 'arjun@store1.com', phone: '9876543210', location: 'Mumbai - Store A', role: 'Admin', joinDate: '2023-10-15', status: 'Active' },
    { id: 102, name: 'Sneha Rao', email: 'sneha@store2.com', phone: '9123456780', location: 'Bangalore - Store B', role: 'Staff', joinDate: '2023-11-01', status: 'Active' },
    { id: 103, name: 'Vikram Singh', email: 'vikram@store1.com', phone: '9988776655', location: 'Mumbai - Store A', role: 'Staff', joinDate: '2023-12-10', status: 'Inactive' },
    { id: 104, name: 'Priya Iyer', email: 'priya@store3.com', phone: '9554433221', location: 'Chennai - Store C', role: 'Admin', joinDate: '2024-01-05', status: 'Active' },
    { id: 105, name: 'Rahul Verma', email: 'rahul@store2.com', phone: '9001122334', location: 'Bangalore - Store B', role: 'Staff', joinDate: '2024-01-20', status: 'Active' },
  ]);

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Employee Master</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your workforce across all locations</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary">
            <Upload size={18} /> Import Excel
          </button>
          <button className="btn btn-secondary">
            <Download size={18} /> Export
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </header>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Table Filters */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input-control"
              placeholder="Search by name, email, or ID..."
              style={{ paddingLeft: '40px', height: '40px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
              <Filter size={16} /> Location
            </button>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
              Role
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <th style={{ padding: '16px 24px', fontWeight: '600' }}>Employee</th>
                <th style={{ padding: '16px 24px', fontWeight: '600' }}>Contact Info</th>
                <th style={{ padding: '16px 24px', fontWeight: '600' }}>Location & Role</th>
                <th style={{ padding: '16px 24px', fontWeight: '600' }}>Join Date</th>
                <th style={{ padding: '16px 24px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: emp.role === 'Admin' ? 'var(--primary)' : 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        color: 'white',
                        fontSize: '0.75rem'
                      }}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>{emp.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <p>{emp.email}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.phone}</p>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <p>{emp.location}</p>
                    <p style={{ fontSize: '0.75rem', color: emp.role === 'Admin' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: emp.role === 'Admin' ? '600' : '400' }}>{emp.role}</p>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>
                    {emp.joinDate}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                        <Edit2 size={16} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}>
                        <Trash2 size={16} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span>Showing 5 of 1,248 employees</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} disabled>Previous</button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Modal Placeholder logic could go here or as a separate component */}
      <AnimatePresence>
        {isModalOpen && (
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
              style={{ width: '100%', maxWidth: '600px', padding: '32px', position: 'relative' }}
            >
              <h2 style={{ marginBottom: '24px' }}>Add New Employee</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input className="input-control" placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Email ID</label>
                  <input className="input-control" placeholder="john@example.com" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input className="input-control" placeholder="+91 ..." />
                </div>
                <div className="input-group">
                  <label>Location</label>
                  <select className="input-control" style={{ appearance: 'none' }}>
                    <option>Mumbai - Store A</option>
                    <option>Bangalore - Store B</option>
                    <option>Chennai - Store C</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Date of Joining</label>
                  <input type="date" className="input-control" />
                </div>
                <div className="input-group">
                  <label>Admin Access</label>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="radio" name="admin" /> Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="radio" name="admin" checked /> No
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="btn btn-primary">Create Employee</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default EmployeeTable;
