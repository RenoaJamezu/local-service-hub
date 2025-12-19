import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User{
  _id: string;
  name: string;
  email: string;
  role: "user" | "provider";
  createdAt: Date;
};

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // todo after logout should refresh the page
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    async function fetchUser() {
      if (!token) return;
  
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch {
        logout();
      };
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext };