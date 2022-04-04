import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModal from '@hooks/useModal';
import React from 'react';
import styled from 'styled-components';

import Button from '@components/common/Button';

function WidgetButton() {
    const { openModal } = useModal();

    const onOpenWidgetFactoryModal = () => {
        openModal({
            key: 'widgetFactoryModal',
        });
    };

    return (
        <StyledButton onClick={onOpenWidgetFactoryModal}>
            <FontAwesomeIcon icon={faWrench} />
            위젯생성하기
        </StyledButton>
    );
}

const StyledButton = styled(Button)`
    display: flex;
    gap: 0.2rem;
    font-size: 0.9rem;
    letter-spacing: -0.05em;
    background-color: ${({ theme }) => theme.color.black};
    color: ${({ theme }) => theme.color.white};
    padding: 0.5rem 1rem;
    border-radius: 100px;
`;

export default WidgetButton;
