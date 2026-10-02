import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployeeDashboard = () => {
  const [hosts, setHosts] = useState([]);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', purposeOfVisit: '', hostId: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.get('/hosts').then(res => {
      setHosts(res.data);
      if(res.data.length > 0) setFormData(f => ({ ...f, hostId: res.data[0].id.toString() }));
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/visitors/preregister', { ...formData, hostId: Number(formData.hostId) });
      setToast('Registered!');
      setFormData({ fullName: '', email: '', phone: '', purposeOfVisit: '', hostId: formData.hostId });
    } catch { setToast('Failed'); }
  };

  return (
    <div className="dashboard-content">
      <h2 className="glow-text">Register Visitor</h2>
      {toast && <div className="toast-notification">{toast}</div>}
      <form onSubmit={submit} className="glass-panel" style={{padding: '2rem'}}>
        <div className="form-group">
          <label>Full Name</label>
          <input className="input-field" value={formData.fullName} onChange={e=>setFormData({...formData, fullName:e.target.value})} required/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="input-field" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} required/>
        </div>
        <div className="form-group">
          <label>Host</label>
          <select className="input-field" value={formData.hostId} onChange={e=>setFormData({...formData, hostId:e.target.value})}>
            {hosts.map(h => <option key={h.id} value={h.id}>{h.fullName} ({h.department})</option>)}
          </select>
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};
export default EmployeeDashboard;
