import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginParams, postLogin } from "./api";

interface User {
  id?: string;
  name: string;
  email: string;
  token: string;
  role: "admin" | "member";
}

interface AuthContextType {
  user: User | null;
  login: (userCredentials: LoginParams) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isMember: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAdmin: false,
  isMember: false,
});

export const useAuth = () => useContext(AuthContext);

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@admin.com",
  password: "admin123",
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (userCredentials: LoginParams) => {
    try {
      // Check if it's admin login
      if (
        userCredentials.email === ADMIN_CREDENTIALS.email &&
        userCredentials.password === ADMIN_CREDENTIALS.password
      ) {
        const adminUser: User = {
          id: "admin-1",
          name: "Admin User",
          email: ADMIN_CREDENTIALS.email,
          token: "admin-token-" + Date.now(),
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(adminUser));
        setUser(adminUser);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${adminUser.token}`;
        return;
      }

      // Check if it's member login (from localStorage)
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      const member = members.find(
        (m: any) =>
          m.email === userCredentials.email &&
          m.password === userCredentials.password
      );

      if (member) {
        const memberUser: User = {
          id: member.id,
          name: member.name || member.email,
          email: member.email,
          token: "member-token-" + Date.now(),
          role: "member",
        };

        localStorage.setItem("user", JSON.stringify(memberUser));
        setUser(memberUser);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${memberUser.token}`;
        return;
      }

      // If not found, try the original API call (for backward compatibility)
      const response = await postLogin(userCredentials);
      const apiUser: User = {
        id: "api-user-" + Date.now(),
        name: response.name,
        email: response.email || userCredentials.email,
        token: response.token,
        role: "member", // Default to member for API users
      };

      localStorage.setItem("user", JSON.stringify(apiUser));
      setUser(apiUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isMember = user?.role === "member";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isMember }}>
      {children}
    </AuthContext.Provider>
  );
};
