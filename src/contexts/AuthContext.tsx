import React, { useContext, useEffect, useMemo, useState } from 'react';

import { API } from '../firebase/api';
import { authService } from '../firebase/fbase';

interface IAuth {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISocial {
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    blog?: string;
}

interface IUser {
    creatorId: string;
    createdAt?: number;
    nickname?: string;
    bank?: string;
    account?: string;
    avatarImgUrl?: string;
    coverImgUrl?: string;
    introduction?: string;
    socialData?: ISocial;
}
interface IAuthProvider {
    children: React.ReactNode;
}
export const AuthContext = React.createContext<IAuth>({
    user: {
        creatorId: '',
    },
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser>({
        creatorId: '',
        createdAt: 0,
    });
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = useMemo(
        () => ({
            user,
            setUser,
            isLoggedIn,
            setIsLoggedIn,
        }),
        [user, setUser, isLoggedIn, setIsLoggedIn],
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
