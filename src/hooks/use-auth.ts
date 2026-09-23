"use client";

import { useState, useEffect } from "react";
import type { User, UserRole } from "@/types";
import { mockUsers } from "@/lib/mock-data";

const STORAGE_KEY = "alazhar-auth-user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to admin user for demo development
        setUser(mockUsers[0]);
      }
    } catch {
      setUser(mockUsers[0]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    _password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    const found = mockUsers.find((u) => u.email === email && u.isActive);
    if (!found) {
      return { success: false, error: "Email atau password salah" };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    setUser(found);
    return { success: true, user: found };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "GURU":
        return "/guru/dashboard";
      case "SISWA":
        return "/siswa/dashboard";
      default:
        return "/login";
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    getRedirectPath,
  };
}
