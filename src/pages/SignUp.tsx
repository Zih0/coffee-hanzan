import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';
import { authService, Providers } from '../fbase';

const Container = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;

  .auth-sns {
    display: flex;
    gap: 1rem;
  }

  .auth-btn {
    display: flex;
    gap: 0.5rem;
    font-size: 0.7rem;
    align-items: center;
    svg {
      font-size: 1.3rem;
    }
  }
`;

function SignUp() {
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    if (name === 'google') {
      await authService.signInWithPopup(Providers.google);
    } else if (name === 'github') {
      await authService.signInWithPopup(Providers.github);
    }
  };

  return (
    <Container>
      <AuthForm />
      <div className="auth-sns">
        <Button
          background="#fedd03"
          color="black"
          size="sm"
          name="google"
          onClick={onSocialClick}
        >
          <p className="auth-btn">
            구글로 로그인
            <FontAwesomeIcon icon={faGoogle} />
          </p>
        </Button>
        <Button
          background="#fedd03"
          color="black"
          size="sm"
          name="github"
          onClick={onSocialClick}
        >
          <p className="auth-btn">
            깃허브로 로그인
            <FontAwesomeIcon icon={faGithub} />
          </p>
        </Button>
      </div>
    </Container>
  );
}

export default SignUp;
