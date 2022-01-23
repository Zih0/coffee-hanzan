import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";

interface IAuthProvider {
  children: React.ReactNode;
}

const defaultState = {
  currentUser: {
    uid: "",
  },
  hasNickname: false,
};

export const AuthContext = React.createContext(defaultState);
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [hasNickname, setHasNickname] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        const User = await dbService
          .collection("user")
          .where("creatorId", "==", user.uid)
          .get();
        if (User.docs.length !== 0) {
          setHasNickname(true);
        }
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AuthContext.Provider
          value={{
            currentUser,
            hasNickname,
          }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        <div></div>
      )}
    </>
  );
};
