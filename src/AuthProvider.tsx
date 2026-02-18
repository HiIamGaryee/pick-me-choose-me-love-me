import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginParams, postLogin } from "./api";
import api from "./utils/axiosConfig";

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

// Remove hardcoded credentials; rely on API

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
      // Call API (tries admin then member)
      const jwt = await postLogin(userCredentials);

      // Persist token and set headers
      localStorage.setItem("token", jwt.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwt.access_token}`;
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwt.access_token}`;

      // Fetch profile to determine role and user info
      const me = await api.get<{
        id: number;
        name: string;
        email: string;
        role: "admin" | "member";
      }>("/users/me");

      const profile = me.data;
      const sessionUser: User = {
        id: String(profile.id),
        name: profile.name,
        email: profile.email,
        token: jwt.access_token,
        role: profile.role,
      };

      localStorage.setItem("user", JSON.stringify(sessionUser));
      setUser(sessionUser);
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
