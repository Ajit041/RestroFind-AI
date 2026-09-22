// Authentication context and hooks
// In a real application, you would integrate with Clerk, Auth.js, or similar

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate auth loading
  // In a real app, you'd check for existing session here
  // For now, we'll simulate a delay
  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 1000);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login
    // For now, simulate
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    // TODO: Implement actual registration
    // For now, simulate
    setUser({
      id: '2',
      email,
      name,
    });
  };

  // Simulate loading state
  // In a real app, remove this and use actual auth state
  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
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