import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.role === 'EMPLOYEE') navigate('/employee');
      else if (data.role === 'HOST') navigate('/host');
      else if (data.role === 'SECURITY') navigate('/security');
      else if (data.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="glow-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>ZT-VIS Login</h2>
        {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>{error}</div>}
        
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '4px' }}>
          <strong>Demo Credentials (password: demo):</strong><br/>
          employee@ztvis.com<br/>
          host@ztvis.com<br/>
          security@ztvis.com<br/>
          admin@ztvis.com
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email / Username</label>
            <input type="text" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Authenticate</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
