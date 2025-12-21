import { createContext, useCallback, useEffect, useState } from "react";
import { useMe } from "../api/useMe";

interface AuthContextType {
  token: string | null;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "provider";
    createdAt: Date;
  } | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const { user, setUser, fetchMe } = useMe();

  const [loading, setLoading] = useState(!!localStorage.getItem("token"));

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    if (!token) return;

    fetchMe()
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, fetchMe, logout]);

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext };