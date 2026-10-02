import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

const HostDashboard = () => {
  const [pending, setPending] = useState([]);
  const [zone, setZone] = useState('Main Lobby');
  const [qrToken, setQrToken] = useState(null);

  const fetchPending = () => api.get('/visitors/pending').then(res => setPending(res.data));
  useEffect(() => { fetchPending(); }, []);

  const issuePass = async (id) => {
    try {
      const res = await api.post(`/passes/issue/${id}`, { zone });
      setQrToken(res.data.qrToken);
      fetchPending();
    } catch (e) { alert('Failed to issue pass'); }
  };

  return (
    <div className="dashboard-content">
      <h2 className="glow-text">Pending Approvals</h2>
      {qrToken && (
        <div className="glass-panel" style={{padding: '2rem', textAlign:'center', marginBottom:'1rem'}}>
          <h3 style={{color:'#38bdf8'}}>Pass Generated</h3>
          <div style={{background:'white', padding:'1rem', display:'inline-block', borderRadius:'8px', marginTop:'1rem'}}>
            <QRCodeSVG value={qrToken} size={200} />
          </div>
          <p style={{marginTop:'1rem', fontSize:'0.8rem', wordBreak:'break-all'}}>{qrToken}</p>
        </div>
      )}
      <div className="grid">
        {pending.map(v => (
          <div key={v.id} className="glass-panel" style={{padding: '1.5rem'}}>
            <h3>{v.fullName}</h3>
            <p>{v.email}</p>
            <p>Purpose: {v.purposeOfVisit}</p>
            <select className="input-field" style={{marginTop:'1rem'}} value={zone} onChange={e=>setZone(e.target.value)}>
              <option>Main Lobby</option>
              <option>Server Room</option>
              <option>Executive Floor</option>
            </select>
            <button className="btn btn-primary" style={{marginTop:'1rem'}} onClick={() => issuePass(v.id)}>Approve & Issue JIT Pass</button>
          </div>
        ))}
        {pending.length === 0 && <p>No pending approvals.</p>}
      </div>
    </div>
  );
};
export default HostDashboard;
