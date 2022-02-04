import React, { useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../firebase/fbase";
import { API } from "../firebase/api";

interface IAuth {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isLoggedIn: boolean;
}

interface IUser {
  creatorId: string;
  createdAt?: number;
  nickname?: string;
  bank?: string;
  account?: string;
  photoUrl?: string;
}
interface IAuthProvider {
  children: React.ReactNode;
}
export const AuthContext = React.createContext<IAuth>({
  user: {
    creatorId: "",
  },
  setUser: () => {},
  isLoggedIn: false,
});

const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser>({
    creatorId: "",
    createdAt: 0,
  });
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoggedIn,
    }),
    [user, setUser, isLoggedIn]
  );

  const checkLogin = () => {
    authService.onAuthStateChanged(async (auth) => {
      if (auth) {
        const fbUser = await API.getUserData(auth.uid);
        if (fbUser) setUser(fbUser);
        else setUser({ creatorId: auth.uid });

        setIsLoggedIn(true);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return init ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    <></>
  );
};

const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export { AuthProvider, useIsLoggedIn };
