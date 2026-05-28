import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleMatches = (userRole, allowedRoles) => {
  if (!allowedRoles?.length) return true;
  return allowedRoles.includes(userRole);
};

const RequireAuth = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const loginPath = roles.includes('student') ? '/login/student' : '/login/staff';
    return <Navigate to={loginPath} replace state={{ from: location.pathname, roles }} />;
  }

  if (!roleMatches(user?.role, roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
