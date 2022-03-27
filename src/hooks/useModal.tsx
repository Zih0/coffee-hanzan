import { useContext, useEffect } from 'react';

import { IModal, ModalContext } from '@contexts/ModalContext';

interface IUseModal {
    openModal: ({ key, props }: IModal) => void;
    closeCurrentModal: () => void;
}

function useModal(): IUseModal {
    const { modalList, setModalList } = useContext(ModalContext);

    useEffect(() => {}, [modalList]);

    const addModal = ({ key, props }: IModal) => {
        setModalList((prev) => [...prev, { key, props }]);
    };

    const closeCurrentModal = () => {
        const newModalList = [...modalList];
        newModalList.pop();
        setModalList(newModalList);
    };

    const openModal = ({ key, props }: IModal) => {
        addModal({ key, props });
    };

    return {
        openModal,
        closeCurrentModal,
    };
}

export default useModal;
