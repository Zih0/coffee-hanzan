import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../../../contexts/AuthContext';
import QR from '../../common/QR/QR';

interface ISupportModalProps {
    amount: number;
    bank: string;
    account: string;
}

function SupportModal({ amount, bank, account }: ISupportModalProps) {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <div>
                <p className="support-notice">
                    휴대폰 카메라로 QR코드를 스캔해주세요
                </p>
                <p className="support-desc">
                    토스가 설치되어있어야 정상작동됩니다.
                </p>
            </div>
            <QR bank={bank} account={account} amount={amount} />
        </Container>
    );
}

const Container = styled.div`
    padding: 3rem;
    background-color: #fff;
    z-index: 11;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    border-radius: 16px;

    .support-notice {
        font-size: 12px;
        text-align: center;
    }
    .support-desc {
        margin-top: 4px;
        font-size: 10px;
        text-align: center;
        color: ${({ theme }) => theme.color.gray};
    }
`;

export default SupportModal;
