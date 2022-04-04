import { IconLogo } from '@assets/icons';
import React from 'react';
import styled from 'styled-components';

interface IPreviewProps {
    selectedBackground: string;
    selectedColor: string;
    text: string;
}

function Preview({ selectedBackground, selectedColor, text }: IPreviewProps) {
    return (
        <StyledButton background={selectedBackground} fontColor={selectedColor}>
            <IconLogo />
            <span>{text}</span>
        </StyledButton>
    );
}

const StyledButton = styled.div<{ background: string; fontColor: string }>`
    background-color: ${({ background }) => background};
    color: ${({ fontColor }) => fontColor};
    font-size: 1rem;

    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    border-radius: 1rem;
    cursor: default;

    svg {
        path {
            fill: ${({ fontColor }) => fontColor};
        }
        width: 1.5rem;
        height: 1.5rem;
    }
`;

export default Preview;
