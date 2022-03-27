import React, { useMemo, useState } from 'react';

import { ModalKey } from '../components/Modal/modalManager';

interface IModalContext {
    modalList: IModal[];
}

interface IModalProvider {
    children: React.ReactNode;
}

export interface IModal {
    key: ModalKey;
    props?: any;
}

export const ModalContext = React.createContext<IModalContext>({
    modalList: [],
});

const ModalProvider = ({ children }: IModalProvider) => {
    const [modalList, setModalList] = useState<IModal[]>([]);

    const value = useMemo(
        () => ({
            modalList,
            setModalList,
        }),
        [modalList, setModalList],
    );

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
};

export { ModalProvider };
