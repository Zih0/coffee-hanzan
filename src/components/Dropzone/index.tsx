import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Dropzone() {
  const [crop, setCrop] = useState<Crop>({
    aspect: 1280 / 300,
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: "px",
  });
  const [image, setImage] = useState("");
  const onDrop = useCallback((file) => {
    setImage(URL.createObjectURL(file[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <FontAwesomeIcon icon={faSpinner} spin={true} />
        ) : (
          <p>이미지를 드래그하거나 클릭하여 첨부해주세요.</p>
        )}
      </Container>
      <ReactCrop
        src={image}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
      />
    </>
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
