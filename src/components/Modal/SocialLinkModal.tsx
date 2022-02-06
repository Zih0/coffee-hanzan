import React from "react";
import styled from "styled-components";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../Input";
import Button from "../Button";
import { theme } from "../../styles/theme";

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
  return (
    <Container>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faGithub} />
        <StyledInput placeholder="Github 계정을 입력하세요." />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faTwitter} />
        <StyledInput placeholder="Twitter 계정을 입력하세요." />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faFacebook} />
        <StyledInput placeholder="Facebook 계정을 입력하세요." />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faInstagram} />
        <StyledInput placeholder="Instagram 계정을 입력하세요." />
      </div>
      <div className="social-input-wrapper">
        <FontAwesomeIcon className="social-icon" icon={faEdit} />
        <StyledInput placeholder="블로그 주소를 입력하세요." />
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
        <Button size="sm">저장</Button>
      </div>
    </Container>
  );
}

export default SocialLinkModal;
