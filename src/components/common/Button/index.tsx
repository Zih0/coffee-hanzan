import React from 'react';
import styled from 'styled-components';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'white' | 'black';
    background?: string;
    children: React.ReactNode;
}

const StyledButton = styled.button<IButtonProps>`
    min-width: 6rem;
    border: 1px solid transparent;
    padding: 0.75rem 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: ${({ theme }) => theme.color.white};
    font-size: 0.8rem;
    font-weight: 300;
    cursor: pointer;

    background-color: ${(props) => props.background || 'black'};
    color: ${(props) => props.color || 'white'};

    &:hover {
        font-weight: 500;
    }
`;

function Button({ children, ...props }: IButtonProps) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
