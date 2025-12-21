import { useState, useCallback } from "react";
import api from "./axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "provider";
  createdAt: Date;
}

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    setUser,
    loading,
    fetchMe,
  };
}