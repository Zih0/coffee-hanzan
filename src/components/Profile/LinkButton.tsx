import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import React from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';

function LinkButton() {
    const { openModal } = useModal();

    const onOpenButtonFactoryModal = () => {
        openModal({
            key: 'buttonFactoryModal',
        });
    };

    return (
        <StyledButton onClick={onOpenButtonFactoryModal}>
            <FontAwesomeIcon icon={faWrench} />
            커스텀 버튼 만들기
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

export default LinkButton;
