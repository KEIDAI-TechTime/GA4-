import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  signInWithPopup,
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
    const result = await signInWithPopup(auth, googleProvider);
    // Get OAuth access token for Google APIs
    // @ts-expect-error - credential has accessToken
    const credential = result._tokenResponse;
    if (credential?.oauthAccessToken) {
      localStorage.setItem('google_access_token', credential.oauthAccessToken);
    }
    return result;
  };

  const logout = async () => {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('selected_property');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, accessToken, signInWithGoogle, logout }}>
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
