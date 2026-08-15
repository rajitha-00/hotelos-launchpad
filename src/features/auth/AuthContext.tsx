import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { firebaseAuth } from '../../app/firebase';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  propertyId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'nami_os_auth_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real context from backend GET /users/me
  const syncMeContext = async (fbUser: FirebaseUser): Promise<AuthUser> => {
    try {
      const token = await fbUser.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        const data = json.data;
        if (data?.organizationId) {
          localStorage.setItem('hotelos.org_id', data.organizationId);
        }
        if (data?.propertyId) {
          localStorage.setItem('hotelos.prop_id', data.propertyId);
        }

        return {
          id: data?.user?.id || fbUser.uid,
          name: data?.user?.fullName || fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          role: data?.user?.role || 'SUPER_ADMIN',
          tenantId: data?.organizationId || '',
          propertyId: data?.propertyId || undefined,
        };
      }
    } catch {
      // Backend error fallback to Firebase token identity
    }

    return {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      email: fbUser.email || '',
      role: 'SUPER_ADMIN',
      tenantId: localStorage.getItem('hotelos.org_id') || '',
      propertyId: localStorage.getItem('hotelos.prop_id') || undefined,
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser: FirebaseUser | null) => {
      setIsLoading(true);
      if (fbUser) {
        const authUser = await syncMeContext(fbUser);
        setUser(authUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      } else {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      // Step 1: Real Firebase Authentication
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, pass);
      if (cred.user) {
        // Step 2: Bootstrap real /users/me backend context
        const loggedUser = await syncMeContext(cred.user);
        setUser(loggedUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: 'Authentication failed' };
    } catch (err: any) {
      setIsLoading(false);
      let errorMsg = 'Invalid email or password.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMsg = 'Invalid login credentials. Please check your email and password.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Access disabled due to repeated failed attempts. Please try again later.';
      } else if (err.message) {
        errorMsg = err.message;
      }
      return { success: false, message: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch {
      // Ignore firebase signout errors
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('hotelos.org_id');
    localStorage.removeItem('hotelos.prop_id');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
