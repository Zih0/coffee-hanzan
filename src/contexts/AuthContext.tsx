import React, { useEffect, useState } from 'react';
import { authService } from '../fbase';

interface IAuthProvider {
  children: React.ReactNode;
}

const defaultState = {
  currentUser: {},
};

export const AuthContext = React.createContext(defaultState);
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        // setIsLoggedIn(true);
      } else {
        // setIsLoggedIn(false);
        setCurrentUser(null);
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
