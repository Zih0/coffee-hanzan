import React, { useState } from 'react';
import styled from 'styled-components';

import { authService } from '../../firebase/fbase';
import AuthSNS from '../Auth/AuthSNS';
import Button from '../common/Button';
import Input from '../common/Input';

const Container = styled.div`
    width: 25rem;
    height: 30rem;
    padding: 3rem;
    background-color: #fff;
    z-index: 11;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 16px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .auth-header {
        font-size: 2rem;
        font-weight: 800;
    }

    .auth-error {
        color: tomato;
        text-align: center;
        font-size: 12px;
    }
`;

function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        setEmail(value);
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        setPassword(value);
    };

    const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await authService.signInWithEmailAndPassword(email, password);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={onSubmitSignUp}>
                <h2 className="auth-header">로그인</h2>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={onChangeEmail}
                    value={email}
                />
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                    value={password}
                />

                <Button type="submit">이메일로 로그인</Button>
                {error && <span className="auth-error">{error}</span>}
            </Form>
            <AuthSNS direction="column" />
        </Container>
    );
}

export default LoginModal;
