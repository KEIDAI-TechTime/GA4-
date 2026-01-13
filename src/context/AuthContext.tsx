import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  reAuthenticate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Get the access token for API calls
        const token = await user.getIdToken();
        setAccessToken(token);
      } else {
        setAccessToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    // Use popup for direct subdomain - works better than redirect
    const result = await signInWithPopup(auth, googleProvider);

    // Get the Google OAuth access token from credential
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      localStorage.setItem('google_access_token', credential.accessToken);
    } else {
      // Fallback: Get from internal token response
      // @ts-expect-error - _tokenResponse is internal but contains oauthAccessToken
      const tokenResponse = result._tokenResponse;
      if (tokenResponse?.oauthAccessToken) {
        localStorage.setItem('google_access_token', tokenResponse.oauthAccessToken);
      }
    }
    return result;
  };

  const logout = async () => {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('selected_property');
    localStorage.removeItem('selected_industry');
    await signOut(auth);
  };

  // Re-authenticate to refresh Google OAuth token
  const reAuthenticate = async () => {
    try {
      // Clear old token
      localStorage.removeItem('google_access_token');
      // Sign in again to get fresh token
      await signInWithGoogle();
    } catch (error) {
      console.error('Re-authentication failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, accessToken, signInWithGoogle, logout, reAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
