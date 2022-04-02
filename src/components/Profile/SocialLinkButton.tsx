import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import styled from 'styled-components';

import Button from '@components/common/Button';

function SocialLinkButton() {
    const { openModal } = useModal();

    const onOpenSocialLinkModal = () => {
        openModal({
            key: 'socialLinkModal',
        });
    };

    return (
        <StyledButton onClick={onOpenSocialLinkModal}>
            <FontAwesomeIcon icon={faLink} />
            소셜 정보 연결
        </StyledButton>
    );
}

const StyledButton = styled(Button)`
    display: flex;
    gap: 0.2rem;
    font-size: 0.9rem;
    letter-spacing: -0.05em;
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
`;

export default SocialLinkButton;
