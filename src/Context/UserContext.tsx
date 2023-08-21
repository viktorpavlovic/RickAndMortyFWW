import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

export type AuthUser = {
  name: string;
  password: string;
};
export type ApiData = {
  results: Character[];
};
export type SearchValue = {
  data: any;
};
export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
}
interface FavoriteCharacter {
  name: string;
  image: string;
  species: string;
}
export type PagesInfo = {
  url(url: any): unknown;
  page: number;
};

export type CurrentPageUrl = {
  url: string;
};

type UserContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  data: ApiData | null;
  setData: React.Dispatch<React.SetStateAction<ApiData | null>>;
  navigateToHome: () => void;
  navigateToFavorites: () => void;
  navigateToChar: () => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (num: number) => void;
  handleSearch: (input: any, type: string) => void;
  searchValue: SearchValue | null;
  searchType: string | null;
  favorites: FavoriteCharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteCharacter[]>>;
  currentPageUrl: any;
  nextPageUrl: PagesInfo | null;
  prevPageUrl: PagesInfo | null;
  pages: any;
  setCurrentPageUrl: React.Dispatch<React.SetStateAction<string>>;
  setNextPageUrl: React.Dispatch<React.SetStateAction<PagesInfo | null>>;
  setPrevPageUrl: React.Dispatch<React.SetStateAction<PagesInfo | null>>;
  setPages: React.Dispatch<React.SetStateAction<PagesInfo | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>(null as any);
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [data, setData] = useState<ApiData | null>(null);
  const [searchValue, setSearchValue] = useState<SearchValue | null>(null);
  const [searchType, setSearchType] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [currentPageUrl, setCurrentPageUrl] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage
      ? `https://rickandmortyapi.com/api/character?page=${storedPage}`
      : "https://rickandmortyapi.com/api/character";
  });
  const [nextPageUrl, setNextPageUrl] = useState<PagesInfo | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<PagesInfo | null>(null);
  const [pages, setPages] = useState<PagesInfo | null>(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUser({ name: storedUsername, password: storedPassword });
    }
  }, []);
  const navigate = useNavigate();
  const handleSearch = (
    input: SetStateAction<SearchValue | null>,
    type: string
  ) => {
    setSearchValue({ data: input });
    setSearchType(type);
  };
  const navigateToHome = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setUser(null);
    navigate("/");
  };
  const navigateToFavorites = () => {
    navigate("/favorites");
  };
  const navigateToChar = () => {
    navigate("/home");
  };

  const nextPage = () => {
    if (nextPageUrl && nextPageUrl !== undefined) {
      setCurrentPageUrl(nextPageUrl.toString());
    }
  };

  const prevPage = () => {
    if (prevPageUrl && prevPageUrl !== undefined) {
      setCurrentPageUrl(prevPageUrl.toString());
    }
  };

  const goToPage = (num: number) => {
    setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`);
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
        handleSearch,
        searchValue,
        searchType,
        favorites,
        setFavorites,
        setNextPageUrl,
        setPrevPageUrl,
        setPages,
        setCurrentPageUrl,
        nextPageUrl,
        prevPageUrl,
        pages,
        currentPageUrl,
        nextPage,
        prevPage,
        goToPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// interface ICharacter<T> {
//   name: string;
//   sexInfo: T;
// }

// interface MaleReproductiveInfo {
//   dSize: string;

// }

// const aleksa : ICharacter<MaleReproductiveInfo>

// aleksa.sexInfo.
