import React, { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../../fbase';
import Input from '../Input';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: 300;

  .auth-login {
    margin-left: 0.5rem;
  }

  .highlight {
    font-weight: 500;
    &:hover {
      border-bottom: 1px solid #000;
    }
  }
`;

const Form = styled.form`
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .auth-header {
    font-size: 2rem;
    font-weight: 800;
  }

  .auth-submit {
    padding: 1rem 0;
    background-color: #fedd03;
    color: #000;
    border: none;
    border-radius: 2rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      background-color: #f2d200;
    }
  }
`;

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h2 className="auth-header">회원가입</h2>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="auth-input"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className="auth-input"
        />
        <Input
          type="submit"
          value="회원가입"
          className="auth-input auth-submit"
        />
        {error && <span className="authError">{error}</span>}
      </Form>
      <span className="auth-login">
        계정이 이미 있으신가요? <span className="highlight">로그인</span>
      </span>
    </Container>
  );
}

export default AuthForm;
