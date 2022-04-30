import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import AuthForm from '@components/Auth/AuthForm';
import AuthSNS from '@components/Auth/AuthSNS';

import { AuthContext } from '../contexts/AuthContext';

function SignUp() {
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) history.replace('/');
    }, [isLoggedIn]);

    return (
        <Container>
            <AuthForm />
            <AuthSNS />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 1rem;
`;

export default SignUp;
