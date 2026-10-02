import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, getRole, getUsername } from '../services/auth';

const Sidebar = () => {
  const role = getRole();
  const username = getUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2 className="glow-text">ZT-VIS</h2>
        <p style={{color: '#94a3b8', fontSize: '0.8rem', marginTop: '5px'}}>Logged in as: <br/><strong style={{color:'#38bdf8'}}>{username}</strong> ({role})</p>
      </div>
      <nav className="sidebar-nav">
        {role === 'EMPLOYEE' && <NavLink to="/employee" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Registration</NavLink>}
        {role === 'HOST' && <NavLink to="/host" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Host Approval</NavLink>}
        {role === 'SECURITY' && <NavLink to="/security" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Security Scanner</NavLink>}
        {role === 'ADMIN' && <NavLink to="/admin" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>System Dashboard</NavLink>}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn btn-secondary" style={{width: '100%', borderColor: '#ef4444', color: '#ef4444'}}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
