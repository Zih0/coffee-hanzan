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
  hasAccount: false,
};

export const AuthContext = React.createContext(defaultState);
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [hasNickname, setHasNickname] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setInit(false);
        setCurrentUser(user);
        const User = await dbService
          .collection("user")
          .where("creatorId", "==", user.uid)
          .get();
        if (User.docs.length !== 0) {
          setHasNickname(true);
          User.docs.forEach((doc) => {
            if (doc.data().account) {
              setHasAccount(true);
            }
          });
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
            hasAccount,
          }}
        >
          {children}
        </AuthContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
