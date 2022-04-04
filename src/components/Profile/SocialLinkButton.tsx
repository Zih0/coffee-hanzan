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
            소셜정보연결
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
    border: 1px solid ${({ theme }) => theme.color.black};
    padding: 0.5rem 1rem;
    border-radius: 100px;
`;

export default SocialLinkButton;
