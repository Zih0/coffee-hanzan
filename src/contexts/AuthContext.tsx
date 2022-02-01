import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { authService } from "../firebase/fbase";

type User = firebase.User | null;
interface IUser {
  auth: User;
}
interface IAuthProvider {
  children: React.ReactNode;
}
export const AuthContext = React.createContext<IUser | undefined>(undefined);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState<User>(null);

  useEffect(() => {
    authService.onAuthStateChanged(setAuth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("this hook must be used within AuthProvider");
  }

  return context.auth;
}

export { AuthProvider, useAuth };
