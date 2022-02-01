import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ImgDefaultProfile } from "../assets/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .wrapper {
    max-width: 960px;

    margin: 2rem 3rem;
  }

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
    border-radius: 50%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.515024),
      rgba(0, 0, 0, 0.515024)
    );
  }

  .add-pic-camera {
    position: absolute;
    top: 36%;
    left: 36%;
    width: 2.5rem;
    height: 2.5rem;

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

function Profile() {
  const [profileImg, setProfileImg] = useState(ImgDefaultProfile);

  useEffect(() => {}, []);

  return (
    <Container>
      <div className="cover-image"></div>
      <div className="profile-image-container">
        <div className="profile-image-wrapper">
          <img src={profileImg} alt="" className="profile-image" />
          <FontAwesomeIcon className="add-pic-camera" icon={faCamera} />
        </div>
      </div>
      <div className="wrapper">
        <Link to="set-payment">계좌 설정</Link>
      </div>
    </Container>
  );
}

export default Profile;
