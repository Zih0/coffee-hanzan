import React, { useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../../contexts/ModalContext';
import { modals } from './modalManager';

function Modal() {
    const { modalList } = useContext(ModalContext);

    return (
        <>
            {modalList.length > 0 && (
                <Container>
                    {modalList.map(({ key, props }) => {
                        const CustomModal = modals[key];
                        return <CustomModal key={key} {...props} />;
                    })}
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

export default Modal;
