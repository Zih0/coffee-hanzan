import {
    faFacebook,
    faGithub,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AuthContext } from '../../../contexts/AuthContext';
import { API } from '../../../firebase/api';
import { theme } from '../../../styles/theme';
import Button from '../../common/Button';
import Input from '../../common/Input';

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

function SocialLinkModal() {
    const { closeCurrentModal } = useModal();
    const { user, setUser } = useContext(AuthContext);
    const [github, setGithub] = useState(user.socialData?.github ?? '');
    const [twitter, setTwitter] = useState(user.socialData?.twitter ?? '');
    const [facebook, setFacebook] = useState(user.socialData?.facebook ?? '');
    const [instagram, setInstagram] = useState(
        user.socialData?.instagram ?? '',
    );
    const [blog, setBlog] = useState(user.socialData?.blog ?? '');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            currentTarget: { name, value },
        } = event;
        if (name === 'github') setGithub(value);
        else if (name === 'twitter') setTwitter(value);
        else if (name === 'facebook') setFacebook(value);
        else if (name === 'instagram') setInstagram(value);
        else if (name === 'blog') setBlog(value);
    };

    const onSaveSocial = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const trimmedGithub = github.trim();
        const trimmedTwitter = twitter.trim();
        const trimmeFacebook = facebook.trim();
        const trimmeInstagram = instagram.trim();
        const trimmedBlog = blog.trim();

        const newSocialLinkData = {
            github: trimmedGithub,
            twitter: trimmedTwitter,
            facebook: trimmeFacebook,
            instagram: trimmeInstagram,
            blog: trimmedBlog,
        };

        await API.updateUserSocialData(user.creatorId, newSocialLinkData);
        const updatedUserData = Object.assign(
            { ...user },
            {
                socialData: newSocialLinkData,
            },
        );
        setUser(updatedUserData);

        toast.success('소셜 정보가 업데이트되었습니다.');

        closeCurrentModal();
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
                    onClick={closeCurrentModal}
                >
                    취소
                </Button>
                <Button onClick={onSaveSocial}>저장</Button>
            </div>
        </Container>
    );
}

export default SocialLinkModal;