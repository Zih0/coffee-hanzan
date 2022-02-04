import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  animation: 0.5s ${({theme}) => theme.animation.fadein};
  transition: all 0.5s;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
`;

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
  };

  interface IModalProps {
    children: React.ReactNode;
  }

  function ModalPortal({ children }: IModalProps) {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const modalDom = document.querySelector("#root-modal");
        ref.current = modalDom;
      }
    }, []);

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div className="modal-background" onClick={closeModal}></div>
          {children}
        </Container>,
        ref.current
      );
    }
    return null;
  }

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};
export default useModal;
