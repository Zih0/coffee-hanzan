import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.color.gray};
    flex-wrap: wrap;

    h1 {
        font-size: 2rem;
        font-weight: 900;
    }

    input {
        width: 10rem;
        border: none;
        font-size: 2rem;
    }

    @media ${({ theme }) => theme.size.mobile} {
        h1 {
            font-size: 1rem;
        }

        input {
            width: 5rem;
            font-size: 1rem;
        }
    }
`;

interface INicknameInput {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function NicknameInput({ value = '', onChange }: INicknameInput) {
    return (
        <Container>
            <h1>coffee-hanzan.com/</h1>
            <input
                type="text"
                placeholder="yourname"
                value={value}
                onChange={onChange}
            />
        </Container>
    );
}

export default NicknameInput;
