import React, { useCallback } from "react";
import styled from "styled-components";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";

interface IDropzoneProps {
  onChangeImage: (file: File) => void;
}

function Dropzone({ onChangeImage }: IDropzoneProps) {
  const onDrop = useCallback(
    (files: File[]) => {
      onChangeImage(files[0]);
    },
    [onChangeImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <FontAwesomeIcon icon={faSpinner} spin={true} />
      ) : (
        <p>이미지를 드래그하거나 클릭하여 첨부해주세요.</p>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 10rem;
  border: 3px dashed ${({ theme }) => theme.color.gray};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 3rem;
  }
`;

export default Dropzone;
