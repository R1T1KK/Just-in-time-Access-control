import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import api from './services/api';

// Icons (using simple SVG strings for zero-dependency)
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconScan = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10" rx="1"></rect></svg>;
const IconActivity = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconAlert = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

// ── Extra Icons ──
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const IconLogOut = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;

// Gradient SVG def – injected once, referenced by logo shield
const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('preregister');
  const [toast, setToast] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.post('/auth/login', { email: 'admin@ztvis.com', password: 'demo' })
      .then(res => { localStorage.setItem('token', res.data.token); setIsReady(true); })
      .catch(err => { console.error('Login failed', err); showToast('System connection failed. Check backend.', 'error'); });
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = (tab) => { setActiveTab(tab); setSidebarOpen(false); };

  const navItem = (tab, icon, label) => (
    <button className={`nav-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => navigate(tab)}>
      <span className="nav-icon-wrap"><span className="nav-icon">{icon}</span></span>
      <span className="nav-label">{label}</span>
    </button>
  );

  return (
    <div className="app-shell">
      <SvgDefs />

      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
        <IconMenu />
      </button>

      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'mobile-open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>

        {/* Brand */}
        <div className="sidebar-logo">
          <div className="logo-brand">
            <div className="logo-icon-wrap">
              <svg className="logo-shield" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#shieldGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="url(#shieldGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="logo-text-group">
              <div className="logo-text">ZT-VIS</div>
              <div className="logo-sub">Zero-Trust Platform</div>
            </div>
          </div>
          <div className="logo-version-chip">
            <span className="logo-version-dot" />
            v2.0 · Enterprise
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Visitor Management</div>
          {navItem('preregister', <IconUser />, 'Pre-Register Visitor')}
          {navItem('admin', <IconGrid />, 'JIT Admin Dashboard')}

          <div className="sidebar-section-label">Access Control</div>
          {navItem('scan', <IconScan />, 'Checkpoint Simulator')}
          {navItem('events', <IconActivity />, 'Access Logs')}


        </nav>

        {/* Footer – user profile + logout */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">A</div>
            <div className="user-info-text">
              <div className="user-name">Admin User</div>
              <div className="user-role-badge">● ADMIN</div>
            </div>
          </div>
          <button className="logout-btn" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
            <IconLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>{
              activeTab === 'preregister' ? 'Pre-Register Visitor' :
                activeTab === 'admin' ? 'JIT Admin Dashboard' :
                  activeTab === 'scan' ? 'Checkpoint Simulator' :
                    'Real-time Access Logs'
            }</h1>
            <p>Identity-first Just-In-Time access management</p>
          </div>
          <div className="topbar-right">
            <div className="status-pill">
              <div className="status-dot" /> System Active
            </div>
          </div>
        </header>

        <div className="page-content page-enter">
          {!isReady && <div style={{ padding: '20px', color: 'var(--text-muted)' }}>Connecting to Secure Network...</div>}
          {isReady && activeTab === 'preregister' && <PreRegister showToast={showToast} />}
          {isReady && activeTab === 'admin' && <AdminDashboard showToast={showToast} />}
          {isReady && activeTab === 'scan' && <ScanSimulator showToast={showToast} />}
          {isReady && activeTab === 'events' && <AccessLogs />}

        </div>
      </main>

      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? <IconCheck /> : toast.type === 'error' ? <IconX /> : <IconAlert />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function PreRegister({ showToast }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', purposeOfVisit: '', hostId: '' });
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/hosts').then(res => {
      setHosts(res.data);
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, hostId: res.data[0].id.toString() }));
      }
    }).catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/visitors/preregister', formData);
      showToast('Pre-registration successful!');
      setFormData(prev => ({ ...prev, fullName: '', email: '', phone: '', purposeOfVisit: '' }));
    } catch (err) {
      console.error(err);
      showToast('Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="two-col-layout">
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title"><IconUser className="panel-title-icon" /> Visitor Details</div>
        </div>
        <div className="panel-body">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="e.g. John Doe" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Host</label>
              <select className="form-select" value={formData.hostId} onChange={e => setFormData({ ...formData, hostId: e.target.value })} required>
                {hosts.map(h => <option key={h.id} value={h.id}>{h.fullName} ({h.department})</option>)}
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Purpose of Visit</label>
              <textarea className="form-textarea" placeholder="Briefly describe the reason for visit..." value={formData.purposeOfVisit} onChange={e => setFormData({ ...formData, purposeOfVisit: e.target.value })} required></textarea>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setFormData({ ...formData, fullName: '', email: '', phone: '', purposeOfVisit: '' })}>Clear</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registering...' : 'Register Visitor'}</button>
            </div>
          </form>
        </div>
      </div>

      <div className="section-gap">
        <div className="stat-card">
          <IconShield className="stat-icon" style={{ color: 'var(--accent-blue)' }} />
          <div className="stat-label">Security Policy</div>
          <div className="stat-value">Zero-Trust</div>
          <div className="stat-sub">All access must be explicitly verified and granted via JIT tokens.</div>
        </div>
        <div className="stat-card">
          <IconActivity className="stat-icon" style={{ color: 'var(--accent-cyan)' }} />
          <div className="stat-label">Access Workflow</div>
          <div className="stat-value">3-Step</div>
          <div className="stat-sub">1. Pre-register &rarr; 2. Host Approval &rarr; 3. Scan & Verify</div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ showToast }) {
  const [filter, setFilter] = useState('PENDING');
  const [visitors, setVisitors] = useState([]);
  const [qrToken, setQrToken] = useState(null);
  const [zone, setZone] = useState('Main Lobby');

  const fetchVisitors = () => {
    api.get('/visitors').then(res => {
      const now = new Date();
      setVisitors(res.data.map(v => {
        if (v.status === 'APPROVED' && v.accessExpiresAt) {
          const isExpired = new Date(v.accessExpiresAt) < now;
          return { ...v, displayState: isExpired ? 'EXPIRED' : 'ACTIVE' };
        }
        return { ...v, displayState: v.status };
      }));
    }).catch(err => console.error("Failed to fetch visitors", err));
  };

  useEffect(() => {
    fetchVisitors();
    // Auto-refresh every 5 seconds to update Active/Expired statuses in real-time
    const interval = setInterval(fetchVisitors, 5000);
    return () => clearInterval(interval);
  }, [filter]);

  const issuePass = (visitorId) => {
    api.post(`/passes/issue/${visitorId}`, { zone })
      .then(res => {
        setQrToken(res.data.qrToken);
        showToast('JIT Pass issued successfully for 5 minutes');
        fetchVisitors();
      })
      .catch(err => {
        console.error(err);
        showToast('Failed to issue pass', 'error');
      });
  };

  const rejectPass = (visitorId) => {
    showToast('Visitor request rejected', 'error');
    fetchVisitors();
  };

  const filteredVisitors = visitors.filter(v => v.displayState === filter || (filter === 'APPROVED' && v.status === 'APPROVED'));

  return (
    <div className="two-col-layout">
      <div className="panel" style={{ gridColumn: 'span 2' }}>
        <div className="panel-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <div className="panel-title"><IconShield className="panel-title-icon" /> JIT Admin Dashboard</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className={`btn btn-sm ${filter === 'PENDING' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('PENDING')}>Pending</button>
            <button className={`btn btn-sm ${filter === 'APPROVED' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('APPROVED')}>All Approved</button>
            <button className={`btn btn-sm ${filter === 'ACTIVE' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('ACTIVE')}>Active Access</button>
            <button className={`btn btn-sm ${filter === 'EXPIRED' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('EXPIRED')}>Expired Access</button>
            <button className={`btn btn-sm ${filter === 'REJECTED' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter('REJECTED')}>Rejected</button>
          </div>
        </div>

        {filter === 'PENDING' && (
          <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
            <label className="form-label">Issue passes for Zone: </label>
            <select className="form-select" value={zone} onChange={e => setZone(e.target.value)} style={{ width: '200px', display: 'inline-block', marginLeft: '10px' }}>
              <option value="Main Lobby">Main Lobby</option>
              <option value="Server Room">Server Room</option>
              <option value="Executive Floor">Executive Floor</option>
            </select>
          </div>
        )}

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>JIT Window</th>
                {filter === 'PENDING' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>No visitors in this category.</td></tr>
              )}
              {filteredVisitors.map(v => (
                <tr key={v.id}>
                  <td>
                    <div className="visitor-name">{v.fullName}</div>
                    <div className="visitor-email">{v.email}</div>
                  </td>
                  <td>{v.purposeOfVisit}</td>
                  <td>
                    <span className={`badge badge-${v.displayState.toLowerCase()}`}>{v.displayState}</span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {v.status === 'APPROVED' ? (
                      <>
                        <div>Start: {new Date(v.accessGrantedAt).toLocaleTimeString()}</div>
                        <div>End: {new Date(v.accessExpiresAt).toLocaleTimeString()}</div>
                      </>
                    ) : 'N/A'}
                  </td>
                  {filter === 'PENDING' && (
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-sm btn-success" onClick={() => issuePass(v.id)}>Approve JIT</button>
                        <button className="btn btn-sm btn-ghost" style={{ color: 'var(--accent-red)' }} onClick={() => rejectPass(v.id)}>Reject</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {qrToken && (
        <div className="qr-display" style={{ gridColumn: 'span 2' }}>
          <div className="qr-label">Active JIT Pass Generated</div>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px' }}>
            <QRCodeSVG value={qrToken} size={180} />
          </div>
          <div className="qr-token-box">{qrToken}</div>
          <button className="btn btn-ghost btn-sm" onClick={() => {
            navigator.clipboard.writeText(qrToken);
            showToast('Token copied to clipboard', 'info');
          }}>Copy Token Data</button>
        </div>
      )}
    </div>
  );
}

function ScanSimulator({ showToast }) {
  const [token, setToken] = useState('');
  const [zone, setZone] = useState('Main Lobby');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyAccess = (e) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    api.post('/access/verify', { qrToken: token, zone })
      .then(res => {
        setResult({
          decision: res.data.decision,
          reason: res.data.reason,
          riskScore: res.data.riskScore
        });
        showToast('Scan complete', 'info');
      })
      .catch(err => {
        console.error(err);
        const errDecision = { decision: 'DENY', reason: 'invalid_or_expired_token', riskScore: 100 };
        setResult(errDecision);
        showToast('Scan failed — token invalid or expired', 'error');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="two-col-layout">
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title"><IconScan className="panel-title-icon" /> Checkpoint Simulator</div>
        </div>
        <div className="panel-body">
          <form onSubmit={verifyAccess} className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">QR Token Data</label>
              <textarea className="form-textarea" placeholder="Paste JWT token string here..." value={token} onChange={e => setToken(e.target.value)} required rows="5"></textarea>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Checkpoint Location (Zone)</label>
              <select className="form-select" value={zone} onChange={e => setZone(e.target.value)}>
                <option value="Main Lobby">Main Lobby</option>
                <option value="Server Room">Server Room</option>
                <option value="Executive Floor">Executive Floor</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Scanning...' : 'Simulate Scan'}</button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {result ? (
          <div className={`result-alert ${result.decision.toLowerCase()}`}>
            <div className="result-icon">
              {result.decision === 'ALLOW' ? <IconCheck /> : result.decision === 'DENY' ? <IconX /> : <IconAlert />}
            </div>
            <div>
              <div className="result-decision">{result.decision}</div>
              <div className="result-reason">{result.reason.replace(/_/g, ' ').toUpperCase()}</div>
              <div className="result-score">Calculated Risk Score: <strong>{result.riskScore ?? 'N/A'}</strong></div>
            </div>
          </div>
        ) : (
          <div className="empty-state" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <IconScan className="empty-icon" />
            <div className="empty-text">Awaiting Scan</div>
            <div className="empty-sub">Simulate a QR scan at a physical checkpoint.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function AccessLogs() {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    api.get('/access/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to fetch events', err));
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRiskClass = (score) => {
    if (score === null || score === undefined) return 'risk-bar-high';
    if (score < 30) return 'risk-bar-low';
    if (score < 60) return 'risk-bar-med';
    return 'risk-bar-high';
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title"><IconActivity className="panel-title-icon" /> Real-time Audit Trail</div>
        <button className="btn btn-ghost btn-sm" onClick={fetchEvents}>Refresh</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Zone</th>
              <th>Pass ID</th>
              <th>Decision</th>
              <th>Risk Profile</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr><td colSpan="6" className="empty-state"><div className="empty-text">No events recorded yet.</div></td></tr>
            )}
            {events.map(ev => (
              <tr key={ev.id}>
                <td style={{ color: 'var(--text-secondary)' }}>{new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                <td>{ev.zone}</td>
                <td className="td-mono">{ev.passId ? `#${ev.passId}` : 'N/A'}</td>
                <td>
                  <span className={`badge badge-${ev.decision.toLowerCase()}`}>{ev.decision}</span>
                </td>
                <td>
                  <div className={`risk-bar-wrap ${getRiskClass(ev.riskScore)}`}>
                    <div className="risk-bar-bg">
                      <div className="risk-bar-fill" style={{ width: `${Math.min(ev.riskScore || 100, 100)}%` }}></div>
                    </div>
                    <div className="risk-score-num">{ev.riskScore ?? '-'}</div>
                  </div>
                </td>
                <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ev.reason.replace(/_/g, ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
