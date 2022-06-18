import { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebase";

type Props = {
  children?: JSX.Element;
};

type AuthContextProps = {
  currentUser: User | null | undefined;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(true);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });
  });

  const login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value: AuthContextProps = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{isLoading ? <p>Loading...</p> : children}</AuthContext.Provider>;
};
export default AuthProvider;

// loadingコンポーネント配置
// Googleログイン・GitHubログイン
