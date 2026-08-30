import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { firebaseAuth } from '../../app/firebase';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { ISystemMetrics, ITenantInfo } from '../../interfaces';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { clearTenantSession } from '../launchpad/launchpadSlice';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  tenantId: string;
  propertyId?: string;
  accessibleAppIds?: string[];
  property?: {
    id: string;
    name: string;
    city?: string;
    country?: string;
    roomsCount: number;
    tier: string;
  };
  properties: ITenantInfo[];
  metrics: ISystemMetrics | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  postLoginRippleRequested: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshContext: () => Promise<void>;
  requestPostLoginRipple: () => void;
  dismissPostLoginRipple: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Firebase persists the login. The tenant bootstrap is always fetched again so
  // stale local data can never expose another tenant's apps or properties.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoginRippleRequested, setPostLoginRippleRequested] = useState(false);

  // Fetch real context from backend GET /users/me
  const syncMeContext = async (fbUser: FirebaseUser): Promise<AuthUser> => {
    const token = await fbUser.getIdToken();
    const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
    const res = await fetch(`${apiUrl}/users/me`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Unable to load authenticated tenant context (${res.status})`);
    }

    const json = await res.json();
    const data = json.data;
    const role = String(data?.user?.role || '').toLowerCase();
    if (!data?.user?.id || (!data?.organizationId && role !== 'super_admin')) {
      throw new Error('Authenticated user has no tenant assignment');
    }

    if (data.organizationId) localStorage.setItem('hotelos.org_id', data.organizationId);
    if (data.property?.id) localStorage.setItem('hotelos.prop_id', data.property.id);

    return {
      id: data.user.id,
      name: data.user.fullName || fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      email: data.user.email || fbUser.email || '',
      avatarUrl: data.user.avatarUrl || undefined,
      role,
      tenantId: data.organizationId || '',
      propertyId: data.property?.id || undefined,
      accessibleAppIds: Array.isArray(data.user.accessibleAppIds) ? data.user.accessibleAppIds : [],
      property: data.property || undefined,
      properties: Array.isArray(data.properties) ? data.properties : [],
      metrics: data.metrics || null,
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser: FirebaseUser | null) => {
      setIsLoading(true);
      dispatch(clearTenantSession());
      localStorage.removeItem('hotelos.org_id');
      localStorage.removeItem('hotelos.prop_id');
      localStorage.removeItem('hotelos.avatar');
      if (fbUser) {
        try {
          const authUser = await syncMeContext(fbUser);
          setUser(authUser);
        } catch {
          // Fail closed: never substitute a tenant user with super-admin/demo data.
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      // Step 1: Real Firebase Authentication
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, pass);
      if (cred.user) {
        // Step 2: Bootstrap real /users/me backend context
        const loggedUser = await syncMeContext(cred.user);
        setUser(loggedUser);
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, message: 'Authentication failed' };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMsg = 'Invalid email or password.';
      const errorCode = typeof err === 'object' && err !== null && 'code' in err
        ? String(err.code)
        : '';
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
        errorMsg = 'Invalid login credentials. Please check your email and password.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMsg = 'Access disabled due to repeated failed attempts. Please try again later.';
      } else if (err instanceof Error && err.message) {
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
    dispatch(clearTenantSession());
    setPostLoginRippleRequested(false);
    localStorage.removeItem('hotelos.org_id');
    localStorage.removeItem('hotelos.prop_id');
  };

  const refreshContext = async (): Promise<void> => {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return;
    setIsLoading(true);
    try {
      setUser(await syncMeContext(currentUser));
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        postLoginRippleRequested,
        login,
        logout,
        refreshContext,
        requestPostLoginRipple: () => setPostLoginRippleRequested(true),
        dismissPostLoginRipple: () => setPostLoginRippleRequested(false),
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
