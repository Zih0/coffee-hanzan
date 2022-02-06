import React from "react";
import useModal from "../../hooks/useModal";
import Button from "../Button";
import SocialLinkModal from "../Modal/SocialLinkModal";

function SocialLink() {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <>
      <Button size="sm" onClick={openModal}>
        소셜 정보 연결
      </Button>
      <ModalPortal>
        <SocialLinkModal onClose={closeModal} />
      </ModalPortal>
    </>
  );
}

export default SocialLink;
