import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type AuthUser = {
  name: string;
  password: string;
};
export type ApiData = {
  results: Character[];
};
interface Character {
  name: string;
  image: string;
}

type UserContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  data: ApiData | null;
  setData: React.Dispatch<React.SetStateAction<ApiData | null>>;
  navigateToHome: () => void;
  navigateToFavorites: () => void;
  navigateToChar: () => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [data, setData] = useState<ApiData | null>(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUser({ name: storedUsername, password: storedPassword });
    }
  }, []);
  const navigate = useNavigate();

  const navigateToHome = () => {
    localStorage.clear();
    setUser(null);

    navigate("/");
  };
  const navigateToFavorites = () => {
    navigate("/favorites");
  };
  const navigateToChar = () => {
    navigate("/home");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        data,
        setData,
        navigateToHome,
        navigateToFavorites,
        navigateToChar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
