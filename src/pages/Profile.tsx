import styled from "styled-components";
import ProfileForm from "../components/Profile/ProfileForm";
import TopSection from "../components/Profile/TopSection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .wrapper {
    max-width: 960px;
    width: 100%;
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
  }
`;

function Profile() {
  return (
    <Container>
      <TopSection />
      <div className="wrapper">
        <ProfileForm />
      </div>
    </Container>
  );
}

export default Profile;
