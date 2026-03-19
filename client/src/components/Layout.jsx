import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Bot, Settings, ChevronRight,
  Menu, X, Rocket
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/agents', label: 'Agentes AI', icon: Bot, badge: '3' },
  { path: '/settings', label: 'Configuración', icon: Settings },
];

const businesses = [
  { path: '/business/tesipedia', label: 'Tesipedia', emoji: '📚' },
  { path: '/business/finance-scool', label: 'Finance SCool', emoji: '💰' },
  { path: '/business/taqueria-agent', label: 'Taquería AI', emoji: '🌮' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const nav = (path) => { navigate(path); setSidebarOpen(false); };

  return (
    <>
      {/* Ambient glow */}
      <div style={{ position:'fixed',top:-300,right:-200,width:700,height:700,background:'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 65%)',pointerEvents:'none',zIndex:0 }} />
      <div style={{ position:'fixed',bottom:-300,left:-200,width:700,height:700,background:'radial-gradient(circle,rgba(139,92,246,0.04) 0%,transparent 65%)',pointerEvents:'none',zIndex:0 }} />

      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span style={{ fontSize: 14, fontWeight: 700, background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Propulsa</span>
        <div className="sidebar-avatar" style={{ width: 28, height: 28, fontSize: 10 }}>AS</div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="app-layout">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

          {/* Logo */}
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">
              <Rocket size={17} color="white" />
            </div>
            <div>
              <h1 style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Propulsa</h1>
              <span>AI AGENCY</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="sidebar-nav">
            <div className="sidebar-section-title">Principal</div>
            {navItems.map(item => (
              <button
                key={item.path}
                className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => nav(item.path)}
              >
                <item.icon size={17} />
                {item.label}
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </button>
            ))}

            <div className="sidebar-section-title">Negocios</div>
            {businesses.map(b => (
              <button
                key={b.path}
                className={`sidebar-link ${location.pathname === b.path ? 'active' : ''}`}
                onClick={() => nav(b.path)}
              >
                <span style={{ fontSize: 15, width: 17, textAlign: 'center' }}>{b.emoji}</span>
                {b.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="sidebar-avatar">AS</div>
              <div className="sidebar-user-info">
                <h4>Arturo Suárez</h4>
                <span>Founder & CEO</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
