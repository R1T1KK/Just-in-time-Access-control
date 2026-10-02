import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../services/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  const userRole = getRole();
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to their default dashboard if unauthorized
    if (userRole === 'EMPLOYEE') return <Navigate to="/employee" />;
    if (userRole === 'HOST') return <Navigate to="/host" />;
    if (userRole === 'SECURITY') return <Navigate to="/security" />;
    if (userRole === 'ADMIN') return <Navigate to="/admin" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
