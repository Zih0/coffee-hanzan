import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ cover: string | undefined }>`
    width: 100%;
    margin: 0 auto;

    .cover-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;

        .cover-image {
            width: 100%;
            max-width: 1280px;
            height: 200px;
            position: relative;
            background-image: ${({ cover }) => `url(${cover})`};
            background-color: ${({ theme }) => theme.color.gray};
            background-size: cover;
        }

        .cover-add-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
`;

interface ICoverProps {
    coverImgUrl: string | undefined;
}

function Cover({ coverImgUrl }: ICoverProps) {
    return (
        <Container cover={coverImgUrl}>
            <div className="cover-wrapper">
                <div className="cover-image"></div>
            </div>
        </Container>
    );
}

export default Cover;
