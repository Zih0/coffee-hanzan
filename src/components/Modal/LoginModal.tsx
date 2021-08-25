import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

import Input from '../Input';

const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: #fff;
  z-index: 11;

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
`;

function LoginModal() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

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
    } catch (err) {}
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <div className="input-wrapper">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="이메일 주소"
          onChange={onChangeEmail}
          value={email}
        />
      </div>

      <div className="input-wrapper">
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          value={password}
        />
      </div>

      <div className="sign-up-submit-button-wrapper">
        <Button size="sm" type="submit">
          이메일로 로그인
        </Button>
      </div>
    </Container>
  );
}

export default LoginModal;
