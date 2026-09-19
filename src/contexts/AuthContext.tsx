import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AuthUser = {
  firstname: string;
  lastname: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};

const AUTH_COOKIE = 'planet_auth';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readCookie = (name: string) => document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith(`${name}=`))
  ?.split('=').slice(1).join('=');

const readUser = (): AuthUser | null => {
  const value = readCookie(AUTH_COOKIE);
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value)) as AuthUser;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(readUser);

  useEffect(() => {
    if (user) {
      document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    } else {
      document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    }
  }, [user]);

  const signIn = (nextUser: AuthUser) => setUser(nextUser);
  const signOut = () => setUser(null);

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};