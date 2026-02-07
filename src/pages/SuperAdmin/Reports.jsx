import { FileText, Download, Calendar, MapPin } from 'lucide-react';

const Reports = () => {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Attendance Reports</h1>
          <p style={{ color: 'var(--text-muted)' }}>Generate and export attendance summaries across all locations</p>
        </div>
        <button className="btn btn-primary">
          <Download size={18} /> Export Full Data
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} color="var(--primary)" /> Date Range
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group">
              <label>From</label>
              <input type="date" className="input-control" />
            </div>
            <div className="input-group">
              <label>To</label>
              <input type="date" className="input-control" />
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={20} color="var(--primary)" /> Filters
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group">
              <label>Location</label>
              <select className="input-control">
                <option>All Locations</option>
                <option>Mumbai - Store A</option>
                <option>Bangalore - Store B</option>
              </select>
            </div>
            <div className="input-group">
              <label>Employee Type</label>
              <select className="input-control">
                <option>All Types</option>
                <option>Admin Only</option>
                <option>Staff Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ padding: '40px', color: 'var(--text-muted)' }}>
          <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p>Select filters and click "Export" to generate reports.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
