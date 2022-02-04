import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ImgDefaultProfile } from "../../assets/images";
import { API } from "../../firebase/api";
import { AuthContext } from "../../contexts/AuthContext";

const Container = styled.div`
  .cover-image {
    width: 100vw;
    height: 10rem;
    background-color: ${({ theme }) => theme.color.gray};
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
  }

  .profile-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
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
`;

function TopSection() {
  const { user } = useContext(AuthContext);
  const [profileImg, setProfileImg] = useState(user.photoUrl ?? ImgDefaultProfile);

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];

      setProfileImg(URL.createObjectURL(file));
      await changeAvatar(file);
    }
  };

  const changeAvatar = async (file: File) => {
    const imageUrl = await API.uploadUserPhoto(file);
    await API.setUserPhoto(user.creatorId, imageUrl);
    alert("프로필 사진이 변경되었습니다.");
  };

  return (
    <Container>
      <div className="cover-image"></div>
      <div className="profile-image-container">
        <div className="profile-image-wrapper">
          <img src={profileImg} alt="" className="profile-image" />
          <label className="profile-image-label" htmlFor="image-uploader">
            <FontAwesomeIcon className="add-pic-camera" icon={faCamera} />
          </label>
          <input
            id="image-uploader"
            className="profile-image-input"
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            onChange={onChangeImg}
          />
        </div>
      </div>
    </Container>
  );
}

export default TopSection;
