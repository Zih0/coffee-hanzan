import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import React, { useCallback, useContext, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AuthContext } from '@contexts/AuthContext';

import { API } from '@firebase/api';

import Button from '../Button';

interface IImageCropProps {
    image: string;
}

function ImageCrop({ image }: IImageCropProps) {
    const [loading, setLoading] = useState(false);
    const { closeCurrentModal } = useModal();
    const { user, setUser } = useContext(AuthContext);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>({
        aspect: 1280 / 300,
        x: 0,
        y: 0,
        width: 504,
        height: 118,
        unit: 'px',
    });
    const [completedCrop, setCompletedCrop] = useState<Crop>({
        aspect: 1280 / 300,
        x: 0,
        y: 0,
        width: 504,
        height: 118,
        unit: 'px',
    });

    const uploadCoverImage = async (blob: Blob | null) => {
        if (!blob) return;

        setLoading(true);
        const url = await saveImage(blob);
        const updatedUserData = Object.assign(
            { ...user },
            {
                coverImgUrl: url,
            },
        );
        await API.setUserCover(user.creatorId, url);
        setUser(updatedUserData);

        setLoading(false);

        closeCurrentModal();
        toast.success('커버 사진이 변경되었습니다.');
    };

    const onChangeCoverImage = () => {
        createCanvas();

        if (!canvasRef.current) return;

        canvasRef.current.toBlob(
            (blob: Blob | null) => uploadCoverImage(blob),
            'image/jpeg',
            0.95,
        );
    };

    const saveImage = async (blob: Blob | null) => {
        if (!blob) return;

        const url = await API.uploadUserCover(blob);
        return url;
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const createCanvas = () => {
        if (!completedCrop || !canvasRef.current || !imgRef.current) {
            return;
        }
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const crop = completedCrop;

        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        const pixelRatio = window.devicePixelRatio;

        canvasRef.current.width = crop.width * pixelRatio * scaleX;
        canvasRef.current.height = crop?.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY,
        );
    };

    return (
        <>
            <StyledCrop
                src={image}
                crop={crop}
                onImageLoaded={onLoad}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(crop) => setCompletedCrop(crop)}
            />
            <Button onClick={onChangeCoverImage}>
                {!loading ? (
                    '저장하기'
                ) : (
                    <FontAwesomeIcon icon={faSpinner} spin={true} />
                )}
            </Button>
            <Canvas ref={canvasRef}></Canvas>
        </>
    );
}

const Canvas = styled.canvas`
    width: 0;
    height: 0;
`;

const StyledCrop = styled(ReactCrop)`
    max-height: 400px;
    overflow-y: auto;
`;

export default ImageCrop;
