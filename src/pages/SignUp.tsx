import styled from "styled-components";
import AuthForm from "../components/Auth/AuthForm";
import AuthSNS from "../components/Auth/AuthSNS";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
  margin-top: 1rem;
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
