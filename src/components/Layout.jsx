import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ user, onLogout, children }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar user={user} onLogout={onLogout} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar user={user} />
        <main style={{
          marginLeft: 'var(--sidebar-width)',
          padding: '32px',
          minHeight: 'calc(100vh - 70px)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
