import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "../common/Dropzone";
import ImageCrop from "../common/ImageCrop";

const Container = styled.div`
  width: 600px;
  padding: 3rem;
  background-color: #fff;
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 16px;
`;

interface IImageUploadModalProps {
  closeModal: () => void;
}

function ImageUploadModal({ closeModal }: IImageUploadModalProps) {
  const [image, setImage] = useState("");

  const onChangeImage = (uploadedImage: File) => {
    setImage(URL.createObjectURL(uploadedImage));
  };

  return (
    <Container>
      {image ? (
        <ImageCrop image={image} closeModal={closeModal} />
      ) : (
        <Dropzone onChangeImage={onChangeImage} />
      )}
    </Container>
  );
}

export default ImageUploadModal;
