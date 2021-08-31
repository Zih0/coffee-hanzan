import styled from 'styled-components';
import AuthForm from '../components/Auth/AuthForm';
import AuthSNS from '../components/Auth/AuthSNS';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.5rem;
`;

function SignUp() {
  return (
    <Container>
      <AuthForm />
      <AuthSNS />
    </Container>
  );
}

export default SignUp;
