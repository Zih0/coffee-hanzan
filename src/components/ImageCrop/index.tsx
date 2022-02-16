import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../firebase/api";
import Button from "../Button";

interface IImageCropProps {
  image: string;
  closeModal: () => void;
}

function ImageCrop({ image, closeModal }: IImageCropProps) {
  const { user, setUser } = useContext(AuthContext);

  const canvasRef = useRef<any>(null);
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<Crop>({
    aspect: 1280 / 300,
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: "px",
  });
  const [completedCrop, setCompletedCrop] = useState<Crop>({
    aspect: 1280 / 300,
    x: 0,
    y: 0,
    width: 504,
    height: 118,
    unit: "px",
  });

  const onChangeCoverImage = () => {
    canvasRef.current.toBlob(async (blob: Blob) => {
      const url = await saveImage(blob);
      const updatedUserData = Object.assign(
        { ...user },
        {
          coverImgUrl: url,
        }
      );
      await API.setUserCover(user.creatorId, url);
      setUser(updatedUserData);
      closeModal();
      alert("커버 사진이 변경되었습니다.");
    });
  };

  const saveImage = async (blob: Blob) => {
    const url = await API.uploadUserCover(blob);
    return url;
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !canvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas?.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop?.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <>
      <ReactCrop
        src={image}
        crop={crop}
        onImageLoaded={onLoad}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={(crop) => setCompletedCrop(crop)}
      />

      <Button onClick={onChangeCoverImage}>저장하기</Button>
      <Canvas ref={canvasRef}></Canvas>
    </>
  );
}

const Canvas = styled.canvas`
  width: 0;
  height: 0;
`;

export default ImageCrop;
