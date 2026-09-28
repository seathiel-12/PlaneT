import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmStorageRecovery } from '../Utils/Functions/storageRecovery';

export type AuthUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  register: (user: Omit<AuthUser, 'id'>, password: string) => Promise<void>;
  signOut: () => void;
};

type LocalAccount = Partial<Pick<AuthUser, 'id'>> & Omit<AuthUser, 'id'> & { salt: string; passwordDigest: string };

const AUTH_COOKIE = 'planet_auth';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const ACCOUNTS_KEY = 'planet_demo_accounts';

/** Creates a salted SHA-256 digest for the browser-only demo account store. */
const digestPassword = async (password: string, salt: string): Promise<string> => {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${password}`));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/** Reads demo accounts from local storage, recovering safely from malformed data. */
const readAccounts = (): Record<string, LocalAccount> => {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? '{}') as Record<string, LocalAccount>; }
  catch { return {}; }
};

const readCookie = (name: string) => document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith(`${name}=`))
  ?.split('=').slice(1).join('=');

const readUser = (): AuthUser | null => {
  const value = readCookie(AUTH_COOKIE);
  if (!value) return null;

  try {
    const session = JSON.parse(decodeURIComponent(value)) as Partial<AuthUser>;
    if (!session.id || !session.email) return null;
    return session as AuthUser;
  } catch {
    return null;
  }
};

/** Keeps the demo session available to descendants and persists it in a same-site cookie. */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(readUser);

  useEffect(() => {
    if (user) {
      try {
        const cookieValue = `${AUTH_COOKIE}=${encodeURIComponent(JSON.stringify(user))}`;
        document.cookie = `${cookieValue}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        if (!document.cookie.split('; ').some((cookie) => cookie === cookieValue)) {
          throw new Error('Browser cookie storage is full.');
        }
      } catch {
        if (confirmStorageRecovery('cookie')) navigate('/sign-in', { replace: true });
      }
    } else {
      document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    }
  }, [user]);

  /** Validates credentials against the browser-only demo account registry. */
  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readAccounts();
    const account = accounts[normalizedEmail];
    if (!account || await digestPassword(password, account.salt) !== account.passwordDigest) {
      throw new Error('Email or password is incorrect.');
    }
    const authenticatedUser: AuthUser = { id: account.id ?? crypto.randomUUID(), firstname: account.firstname, lastname: account.lastname, email: normalizedEmail };
    if (!account.id) {
      accounts[normalizedEmail] = { ...account, id: authenticatedUser.id };
      try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); }
      catch {
        confirmStorageRecovery('localStorage');
        throw new Error('Browser storage is full; saved booking data must be cleared before signing in.');
      }
    }
    setUser(authenticatedUser);
  };
  /** Creates a local demo account and starts its session. */
  const register = async (nextUser: Omit<AuthUser, 'id'>, password: string) => {
    const normalizedEmail = nextUser.email.trim().toLowerCase();
    const accounts = readAccounts();
    if (accounts[normalizedEmail]) throw new Error('An account with this email already exists.');
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('');
    const authenticatedUser: AuthUser = { ...nextUser, id: crypto.randomUUID(), email: normalizedEmail };
    accounts[normalizedEmail] = { ...authenticatedUser, salt, passwordDigest: await digestPassword(password, salt) };
    try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); }
    catch {
      confirmStorageRecovery('localStorage');
      throw new Error('Browser storage is full; saved booking data must be cleared before creating an account.');
    }
    setUser(authenticatedUser);
  };
  /** Clears the current demo session. */
  const signOut = () => setUser(null);

  return <AuthContext.Provider value={{ user, signIn, register, signOut }}>{children}</AuthContext.Provider>;
};

/** Provides the frontend demo session and account actions to the component tree. */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
