import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEdit, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { ISocial } from "../../utils/types";

const Container = styled.div`
    width: 100%;
    padding: 12px;

    .info-wrapper {
        width: 100%;
        border-radius: 14px;
        padding: 16px;
        box-shadow: 1px 0 4px rgb(0 2 4 / 6%), 0 7px 18px rgb(1 1 1 / 5%);
    }

    .info-nickname {
      font-size: 20px;
      font-weight: 700;
    }
    
    .info-introduction {
      margin-top: 12px;
      line-height: 1.3;
      white-space: pre-line;
    }

    .info-social {
      margin-top: 24px;
      display: flex;
      gap: 12px;

      svg {
        width: 24px;
        height: 24px;

        &:hover {
          color: ${({ theme }) => theme.color.gray};
        }
      }
    }
}
`;
interface IUserInfoProps {
  nickname: string | undefined;
  introduction: string | undefined;
  socialData: ISocial | undefined;
}

function UserInfo({ nickname, introduction, socialData }: IUserInfoProps) {
  return (
    <Container>
      <div className="info-wrapper">
        <p className="info-nickname">{nickname}</p>
        <p className="info-introduction">{introduction}</p>
        <div className="info-social">
          {socialData?.github && (
            <a
              href={`https://github.com/${socialData?.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
          {socialData?.facebook && (
            <a
              href={`https://facebook.com/${socialData?.facebook}`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          )}
          {socialData?.twitter && (
            <a
              href={`https://twitter.com/${socialData?.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          )}
          {socialData?.instagram && (
            <a
              href={`https://instagram.com/${socialData?.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {socialData?.blog && (
            <a
              href={
                socialData?.blog.includes("http")
                  ? socialData?.blog
                  : `https://${socialData?.blog}`
              }
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLink} />
            </a>
          )}
        </div>
      </div>
    </Container>
  );
}

export default UserInfo;
