import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn as fbSignIn, signOut as fbSignOut, onAuthChange, isAdmin as fbIsAdmin } from '@/lib/firebaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null); // Contains only { id, public_settings }

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      console.log('onAuthChange callback, user:', u);
      if (u) {
        setUser({ uid: u.uid, email: u.email });
        setIsAuthenticated(true);

        // If we've previously recorded this uid as admin in localStorage,
        // optimistically mark as admin so the admin UI doesn't require immediate re-login.
        const storedAdminUid = window.localStorage.getItem('mckayyaf_admin_uid');
        if (storedAdminUid && storedAdminUid === u.uid) {
          setIsAdmin(true);
        }

        try {
          const admin = await fbIsAdmin(u.uid);
          console.log('isAdmin check for', u.uid, ':', admin);
          setIsAdmin(admin === true);
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setIsLoadingAuth(false);
    });

    setIsLoadingPublicSettings(false);

    return () => unsub();
  }, []);

  const logout = async (shouldRedirect = true) => {
    try {
      await fbSignOut();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    // clear remembered admin flag
    try { window.localStorage.removeItem('mckayyaf_admin_uid'); } catch (e) {}
    if (shouldRedirect) {
      window.location.href = '/';
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await fbSignIn(email, password);
      return res;
    } catch (err) {
      setAuthError(err.message || String(err));
      throw err;
    }
  };

  const navigateToLogin = () => {
    window.location.href = '/admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      login,
      navigateToLogin,
      checkAppState: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

