import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SecurityDashboard = () => {
  const [qrToken, setQrToken] = useState('');
  const [zone, setZone] = useState('Main Lobby');
  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState(null);

  const scan = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/access/scan', { qrToken, zone });
      setToast(`Access ${res.data.decision} - Risk Score: ${res.data.riskScore}`);
      setLogs([res.data, ...logs]);
      setQrToken('');
    } catch { setToast('Scan Failed / Invalid Token'); }
  };

  return (
    <div className="dashboard-content">
      <h2 className="glow-text">Security Scanner</h2>
      {toast && <div className="toast-notification">{toast}</div>}
      <form onSubmit={scan} className="glass-panel" style={{padding: '2rem'}}>
        <div className="form-group">
          <label>QR Token</label>
          <input className="input-field" value={qrToken} onChange={e=>setQrToken(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Zone</label>
          <select className="input-field" value={zone} onChange={e=>setZone(e.target.value)}>
            <option>Main Lobby</option>
            <option>Server Room</option>
            <option>Executive Floor</option>
          </select>
        </div>
        <button className="btn btn-primary" style={{background:'#f59e0b', borderColor:'#f59e0b'}}>Scan Pass</button>
      </form>
      
      <h3 style={{marginTop:'2rem'}}>Recent Scans</h3>
      <div className="glass-panel" style={{padding:'1rem'}}>
        {logs.map((l, i) => (
          <div key={i} style={{padding:'0.5rem', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
            <span style={{color: l.decision === 'ALLOW' ? '#10b981' : '#ef4444'}}><strong>{l.decision}</strong></span> - {l.zone} (Risk: {l.riskScore}) - {l.reason}
          </div>
        ))}
        {logs.length === 0 && <p>No recent scans.</p>}
      </div>
    </div>
  );
};
export default SecurityDashboard;
