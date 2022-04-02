import useModal from '@hooks/useModal';
import React, { Suspense, useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '@contexts/ModalContext';

import { modals } from './modalManager';

function Modal() {
    const { modalList } = useContext(ModalContext);
    const { closeCurrentModal } = useModal();

    return (
        <Suspense fallback={<></>}>
            {modalList.length > 0 && (
                <Container>
                    <div
                        className="modal-background"
                        onClick={closeCurrentModal}
                    />
                    <div className="modal-content">
                        {modalList.map(({ key, props }) => {
                            const CustomModal = modals[key];
                            return <CustomModal key={key} {...props} />;
                        })}
                    </div>
                </Container>
            )}
        </Suspense>
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

    .modal-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 1000;
    }

    .modal-content {
        background-color: ${({ theme }) => theme.color.white};
        border-radius: 8px;
        border: none;
        z-index: 1001;
        position: absolute;
        animation: ${({ theme }) => theme.animation.fadein} 0.5s;
        p {
            margin: 0;
        }
    }
`;

export default Modal;
