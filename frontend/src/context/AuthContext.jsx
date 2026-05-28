import React, { createContext, useContext, useMemo, useState } from 'react';
import { clearSession, getStoredSession, login as loginRequest, saveSession, studentLogin as studentLoginRequest } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => getStoredSession());

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    token: session?.token || null,
    isAuthenticated: Boolean(session?.token),
    login: async (identifier, password, accessType = 'staff') => {
      const nextSession = accessType === 'student'
        ? await studentLoginRequest(identifier, password)
        : await loginRequest(identifier, password);
      saveSession(nextSession);
      setSession(nextSession);
      return nextSession;
    },
    logout: () => {
      clearSession();
      setSession(null);
    },
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
