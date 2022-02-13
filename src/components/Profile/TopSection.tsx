import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ImgDefaultProfile } from "../../assets/images";
import { API } from "../../firebase/api";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../Button";
import SocialLink from "./SocialLink";
import { compressImage } from "../../utils/imageCompression";
import useModal from "../../hooks/useModal";
import ImageUploadModal from "../Modal/ImageUploadModal";

const Container = styled.div<{ cover: string }>`
  width: 100%;
  margin: 0 auto;

  .cover-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .cover-image {
      width: 100%;
      max-width: 1280px;
      height: 200px;
      position: relative;
      background: ${({ cover }) => cover} center;
      background-color: ${({ theme }) => theme.color.gray};
    }
    .cover-add-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  .profile-image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -5rem;
  }

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
  }

  .profile-image-label {
    cursor: pointer;
  }

  .profile-image-input {
    display: none;
  }

  .add-pic-camera {
    position: absolute;
    top: 36%;
    left: 36%;
    width: 2.5rem;
    height: 2.5rem;
    transition: 0.3s transform;

    &:hover {
      transform: scale(1.1);
    }

    path {
      fill: #ffffff;
    }
  }

  .title {
    font-weight: 800;
    font-size: 2rem;
    line-height: 1.3;
  }

  .social-link-wrapper {
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  opacity: 0.8;
  gap: 0.2rem;
`;

function TopSection() {
  const { user } = useContext(AuthContext);
  const [avatarImage, setAvatarImage] = useState(
    user.avatarImgUrl ?? ImgDefaultProfile
  );
  const [coverImage, setCoverImage] = useState(user.coverImgUrl ?? "");
  const { openModal, closeModal, ModalPortal } = useModal();

  const onChangeAvatarImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];

      setAvatarImage(URL.createObjectURL(file));
      console.log(file);
      console.log(URL.createObjectURL(file));
      await changeAvatar(file);
      alert("프로필 사진이 변경되었습니다.");
    }
  };

  const onChangeCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const changeAvatar = async (file: File) => {
    const compressedImage = await compressImage(file);
    const imageUrl = await API.uploadUserPhoto(compressedImage);
    await API.setUserPhoto(user.creatorId, imageUrl);
  };

  return (
    <Container cover={coverImage}>
      <div className="cover-wrapper">
        <div className="cover-image">
          <div className="cover-add-button">
            <StyledButton
              width={1}
              size={"sm"}
              background={"#fff"}
              color={"black"}
              onClick={openModal}
            >
              <FontAwesomeIcon icon={faCamera} />
              cover
            </StyledButton>
          </div>
        </div>
      </div>
      <div className="profile-image-container">
        <div className="profile-image-wrapper">
          <img src={avatarImage} alt="" className="profile-image" />
          <label className="profile-image-label" htmlFor="image-uploader">
            <FontAwesomeIcon className="add-pic-camera" icon={faCamera} />
          </label>
          <input
            id="image-uploader"
            className="profile-image-input"
            type="file"
            accept="image/*"
            onChange={onChangeAvatarImage}
          />
        </div>
      </div>

      <div className="social-link-wrapper">
        <SocialLink />
      </div>

      <ModalPortal>
        <ImageUploadModal />
      </ModalPortal>
    </Container>
  );
}

export default TopSection;
