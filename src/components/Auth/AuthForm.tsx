import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../firebase/fbase";
import useModal from "../../hooks/useModal";
import Input from "../Input";
import LoginModal from "../Modal/LoginModal";

const Container = styled.main`
  display: flex;
  width: 100%;
  max-width: 960px;
  align-items: center;
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
      cursor: pointer;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 400px;
  padding: 2rem;
  .auth-header {
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
  }

  .auth-submit {
    padding: 1rem 0;
    background-color: #000;
    color: #fff;
    border: none;
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
  }

  .auth-error {
    color: tomato;
    text-align: center;
    font-size: 12px;
  }
`;

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { openModal, ModalPortal } = useModal();

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      history.push("/setting");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
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
          {error && <span className="auth-error">{error}</span>}
        </Form>
        <span className="auth-login">
          계정이 이미 있으신가요?
          <span className="highlight" onClick={openModal}>
            로그인
          </span>
        </span>
      </Container>
      <ModalPortal>
        <LoginModal />
      </ModalPortal>
    </>
  );
}

export default AuthForm;
