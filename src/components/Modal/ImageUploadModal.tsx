import React from "react";
import styled from "styled-components";
import Dropzone from "../Dropzone";

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

function ImageUploadModal() {
  return (
    <Container>
      <Dropzone />
    </Container>
  );
}

export default ImageUploadModal;
