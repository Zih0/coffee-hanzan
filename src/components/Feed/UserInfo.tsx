import {
    faFacebook,
    faGithub,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { ISocial } from '@utils/types';
import styled from 'styled-components';

import SocialIcon from './SocialIcon';

interface IUserInfoProps {
    introduction: string | undefined;
    socialData: ISocial | undefined;
}

function UserInfo({ introduction, socialData }: IUserInfoProps) {
    return (
        <Container>
            <div className="info-wrapper">
                <p className="info-title">자기소개</p>
                <p className="info-introduction">{introduction}</p>
                <div className="info-social">
                    {socialData?.github && (
                        <SocialIcon
                            href={`https://github.com/${socialData?.github}`}
                            icon={faGithub}
                        />
                    )}
                    {socialData?.facebook && (
                        <SocialIcon
                            href={`https://facebook.com/${socialData?.facebook}`}
                            icon={faFacebook}
                        />
                    )}
                    {socialData?.twitter && (
                        <SocialIcon
                            href={`https://twitter.com/${socialData?.twitter}`}
                            icon={faTwitter}
                        />
                    )}
                    {socialData?.instagram && (
                        <SocialIcon
                            href={`https://instagram.com/${socialData?.instagram}`}
                            icon={faInstagram}
                        />
                    )}
                    {socialData?.blog && (
                        <SocialIcon
                            href={
                                socialData?.blog.includes('http')
                                    ? socialData?.blog
                                    : `https://${socialData?.blog}`
                            }
                            icon={faLink}
                        />
                    )}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 12px;

    .info-wrapper {
        border-radius: 14px;
        padding: 24px;
        box-shadow: 1px 0 4px rgb(0 2 4 / 6%), 0 7px 18px rgb(1 1 1 / 5%);
    }

    .info-title {
        font-size: 20px;
        font-weight: 800;
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
`;

export default UserInfo;
