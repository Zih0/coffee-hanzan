import React, { useContext, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import AuthForm from '@components/Auth/AuthForm';
import AuthSNS from '@components/Auth/AuthSNS';

import { AuthContext } from '../contexts/AuthContext';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 1rem;
`;

function SignUp() {
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useLayoutEffect(() => {
        if (isLoggedIn) history.push('/');
    }, []);

    return (
        <Container>
            <AuthForm />
            <AuthSNS />
        </Container>
    );
}

export default SignUp;
