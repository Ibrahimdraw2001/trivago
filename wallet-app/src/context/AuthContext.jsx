import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth
      .profile()
      .then((data) => setUser(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const result = await api.auth.login(data);
    setUser(result.user);
    return result.user;
  };

  const register = async (data) => {
    const result = await api.auth.register(data);
    setUser(result.user);
    return result.user;
  };

  const logout = useCallback(async () => {
    await api.auth.logout().catch(() => {});
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    const data = await api.auth.profile();
    setUser(data);
    return data;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
