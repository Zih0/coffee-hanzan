import React, { useState } from 'react';
import styled from 'styled-components';

import Dropzone from '@components/common/Dropzone';
import ImageCrop from '@components/common/ImageCrop';

function ImageUploadModal() {
    const [image, setImage] = useState('');

    const onChangeImage = (uploadedImage: File) => {
        setImage(URL.createObjectURL(uploadedImage));
    };

    return (
        <Container>
            {image ? (
                <ImageCrop image={image} />
            ) : (
                <Dropzone onChangeImage={onChangeImage} />
            )}
        </Container>
    );
}

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

export default ImageUploadModal;
