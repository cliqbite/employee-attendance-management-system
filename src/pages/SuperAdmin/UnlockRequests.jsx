import { Lock, CheckCircle, XCircle } from 'lucide-react';

const UnlockRequests = () => {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Unlock Requests</h1>
        <p style={{ color: 'var(--text-muted)' }}>Approve or reject attendance modification requests from store managers</p>
      </header>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <th style={{ padding: '16px 24px' }}>Location</th>
              <th style={{ padding: '16px 24px' }}>Requested Date</th>
              <th style={{ padding: '16px 24px' }}>Requested By</th>
              <th style={{ padding: '16px 24px' }}>Reason</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { location: 'Mumbai - Store A', date: '2024-02-01', requester: 'Arjun Mehta', reason: 'Internet outage on site' },
              { location: 'Bangalore - Store B', date: '2024-02-02', requester: 'Sneha Rao', reason: 'Manager was on leave' },
            ].map((req, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '0.875rem' }}>
                <td style={{ padding: '16px 24px', fontWeight: '600' }}>{req.location}</td>
                <td style={{ padding: '16px 24px' }}>{req.date}</td>
                <td style={{ padding: '16px 24px' }}>{req.requester}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{req.reason}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', background: 'var(--success)' }}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', color: 'var(--danger)' }}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnlockRequests;
