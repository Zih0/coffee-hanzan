import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../common/Input";
import Button from "../common/Button";
import { theme } from "../../styles/theme";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../firebase/api";

const Container = styled.div`
  width: 25rem;
  height: 33rem;
  padding: 3rem;
  background-color: #fff;
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 16px;

  .social-input-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .social-icon {
    width: 2rem;
    height: auto;
    margin-right: 1rem;
  }

  .social-button-wrapper {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

interface ISocialLinkProps {
  onClose: () => void;
}

function SocialLinkModal({ onClose }: ISocialLinkProps) {
  const { user } = useContext(AuthContext);
  const [github, setGithub] = useState(user.socialData?.github ?? "");
  const [twitter, setTwitter] = useState(user.socialData?.twitter ?? "");
  const [facebook, setFacebook] = useState(user.socialData?.facebook ?? "");
  const [instagram, setInstagram] = useState(user.socialData?.instagram ?? "");
  const [blog, setBlog] = useState(user.socialData?.blog ?? "");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e;
    if (name === "github") setGithub(value);
    else if (name === "twitter") setTwitter(value);
    else if (name === "facebook") setFacebook(value);
    else if (name === "instagram") setInstagram(value);
    else if (name === "blog") setBlog(value);
  };

  const onSaveSocial = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const trimmedGithub = github.trim();
    const trimmedTwitter = twitter.trim();
    const trimmeFacebook = facebook.trim();
    const trimmeInstagram = instagram.trim();
    const trimmedBlog = blog.trim();

    await API.updateUserSocialData(user.creatorId, {
      github: trimmedGithub,
      twitter: trimmedTwitter,
      facebook: trimmeFacebook,
      instagram: trimmeInstagram,
      blog: trimmedBlog,
    });
    onClose();

    //TODO: 성공 토스트 띄우기
  };

  return (
    <Container>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faGithub} />
        <StyledInput
          placeholder="Github 계정을 입력하세요."
          name="github"
          value={github}
          onChange={onChange}
        />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faTwitter} />
        <StyledInput
          placeholder="Twitter 계정을 입력하세요."
          name="twitter"
          value={twitter}
          onChange={onChange}
        />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faFacebook} />
        <StyledInput
          placeholder="Facebook 계정을 입력하세요."
          name="facebook"
          value={facebook}
          onChange={onChange}
        />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faInstagram} />
        <StyledInput
          placeholder="Instagram 계정을 입력하세요."
          name="instagram"
          value={instagram}
          onChange={onChange}
        />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faEdit} />
        <StyledInput
          placeholder="블로그 주소를 입력하세요."
          name="blog"
          value={blog}
          onChange={onChange}
        />
      </div>
      <div className="social-button-wrapper">
        <Button
          color="black"
          background={theme.color.gray}
          size="sm"
          onClick={onClose}
        >
          취소
        </Button>
        <Button size="sm" onClick={onSaveSocial}>
          저장
        </Button>
      </div>
    </Container>
  );
}

export default SocialLinkModal;
