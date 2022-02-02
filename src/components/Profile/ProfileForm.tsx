import styled from "styled-components";
import AccountForm from "./AccountForm";
import NicknameForm from "./NicknameForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

function ProfileForm() {
  return (
    <Container>
      <NicknameForm />
      <AccountForm />
    </Container>
  );
}

export default ProfileForm;
