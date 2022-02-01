import React, { useEffect, useMemo, useState } from "react";
import firebase from "firebase/app";
import { authService } from "../firebase/fbase";

type User = firebase.User | null;
interface IAuth {
  auth: User | undefined;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

interface IUser {
  creatorId: string;
  createdAt: number;
  nickname?: string;
  bank?: string;
  account?: number;
}
interface IAuthProvider {
  children: React.ReactNode;
}
export const AuthContext = React.createContext<IAuth>({
  auth: undefined,
  user: {
    creatorId: "",
    createdAt: 0,
  },
  setUser: () => {},
});

const AuthProvider = ({ children }: IAuthProvider) => {
  // firebase auth data
  const [auth, setAuth] = useState<User>(null);
  // firestore user data
  const [user, setUser] = useState<IUser>({
    creatorId: "",
    createdAt: 0,
  });

  const value = useMemo(
    () => ({
      auth,
      user,
      setUser,
    }),
    [auth, user, setUser]
  );

  useEffect(() => {
    authService.onAuthStateChanged(setAuth);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
