import React, { useContext } from "react";
import styled from "styled-components";
import { ImgDefaultProfile } from "../../assets/images";
import { AuthContext } from "../../contexts/AuthContext";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -5rem;

  .profile-image-wrapper {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    position: relative;
    border: 2px solid ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.white};
  }

  .profile-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.515024),
      rgba(0, 0, 0, 0.515024)
    );
  }

  .profile-name {
    margin-top: 4px;
    font-size: 2.5rem;
    font-weight: 800;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 2rem;
    }
  }
`;

interface IAvatarProps {
  avatarImgUrl: string | undefined;
}

function Avatar({ avatarImgUrl }: IAvatarProps) {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <div className="profile-image-container">
        <div className="profile-image-wrapper">
          <img
            src={avatarImgUrl ?? ImgDefaultProfile}
            alt="avatar"
            className="profile-image"
          />
        </div>
      </div>
      <p className="profile-name">{user.nickname}</p>
    </Container>
  );
}

export default Avatar;
