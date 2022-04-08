import React, { useContext, useLayoutEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import NicknameInput from '@components/common/Input/NicknameInput';

import { AuthContext } from '@contexts/AuthContext';

function Home() {
    const [nickname, setNickname] = useState('');
    const { user, isLoggedIn } = useContext(AuthContext);
    const history = useHistory();
    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setNickname(value);
    };

    useLayoutEffect(() => {
        if (!isLoggedIn) return;
        if (!user.nickname) history.push('/setting');
        else history.push(`/${user.nickname}`);
    }, [isLoggedIn, history, user.nickname]);

    return (
        <Container>
            <div className="home-text">
                Paypal, Stripe
                <br />
                한국에서 사용하기 불편하잖아요
                <br />
                커피한잔으로 후원을 받아보세요
            </div>
            <div className="home-start">
                <NicknameInput value={nickname} onChange={onChangeNickname} />
                <Link to="/signup">
                    <StyledButton>시작하기</StyledButton>
                </Link>
            </div>
        </Container>
    );
}

const Container = styled.main`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    .home-text {
        max-width: 960px;
        width: 70%;
        line-height: 5rem;
        font-size: 3rem;
        font-weight: 300;

        @media ${({ theme }) => theme.size.mobile} {
            font-size: 1.2rem;
            line-height: 3rem;
        }
    }

    .home-start {
        display: flex;
        gap: 1rem;

        @media ${({ theme }) => theme.size.mobile} {
            flex-direction: column;

            .home-start-text {
                h1 {
                    font-size: 1rem;
                }
                input {
                    width: 5rem;
                    font-size: 1rem;
                    height: 1rem;
                    margin-bottom: 0.25rem;
                }
            }
        }
    }
`;

const StyledButton = styled(Button)`
    height: 100%;
    width: 8rem;
    font-size: 1.2rem;

    @media ${({ theme }) => theme.size.mobile} {
        width: 100%;
    }
`;

export default Home;
