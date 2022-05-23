import React from 'react';
import styled from 'styled-components';

import { ColorType } from '@type/colorType';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ColorType;
    background?: ColorType;
    children: React.ReactNode;
}

const StyledButton = styled.button<Pick<IButtonProps, 'color' | 'background'>>`
    min-width: 6rem;
    border: 1px solid transparent;
    padding: 1rem 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: ${({ theme }) => theme.color.white};
    font-size: 0.8rem;
    font-weight: 300;
    cursor: pointer;

    background-color: ${({ theme, background }) =>
        background ? theme.color[background] : theme.color.black};
    color: ${({ theme, color }) =>
        color ? theme.color[color] : theme.color.white};

    &:hover {
        font-weight: 500;
    }
`;

function Button({ children, ...props }: IButtonProps) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
