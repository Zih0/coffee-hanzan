import React from "react";
import styled from "styled-components";
import { ImgDefaultProfile } from "../../assets/images";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -5rem;

  .profile-image-wrapper {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    position: relative;
    border: 2px solid ${({ theme }) => theme.color.white};
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
`;

interface IAvatarProps {
  avatarImgUrl: string | undefined;
}

function Avatar({ avatarImgUrl }: IAvatarProps) {
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
    </Container>
  );
}

export default Avatar;
