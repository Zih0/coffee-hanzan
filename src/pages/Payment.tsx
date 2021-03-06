import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bankList } from '@utils/constants';
import { encrypt } from '@utils/crypto';
import { isValidAccountLength, isValidNumber } from '@utils/validation';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Select from '@components/common/Select';

import { AuthContext } from '@contexts/AuthContext';

import { API } from '@firebase/api';

const Container = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Form = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .payment-header {
        font-size: 2rem;
        font-weight: 300;
        margin-bottom: 2rem;
    }

    .payment-label {
        font-size: 1rem;
        font-weight: 300;
        width: 100%;
    }

    .account-rule {
        width: 100%;
        font-weight: 200;
        margin-top: -0.5rem;
    }

    .account-error {
        margin-top: -0.5rem;
        width: 100%;
        color: tomato;
    }
`;

const StyledSelect = styled(Select)`
    width: 100%;
    padding: 1rem;
`;

const StyledInput = styled(Input)`
    width: 100%;
    padding: 1rem;
`;

const StyledButton = styled(Button)`
    width: 100%;
`;

function Payment() {
    const [selectedBank, setSelectedBank] = useState('NH농협');
    const [account, setAccount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    const onInputBank = (e: React.FormEvent<HTMLSelectElement>) => {
        const {
            currentTarget: { value },
        } = e;

        setSelectedBank(value);
    };

    const onChangeAccount = (e: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = e;

        setError('');
        setAccount(value);
    };

    const onSubmitAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidNumber(account)) {
            setError('계좌번호에 숫자만 입력해주세요.');
            return;
        }
        if (!isValidAccountLength(account)) {
            setError('계좌번호를 다시 확인해주세요.');
            return;
        }
        setLoading(true);

        const encryptedBank = encrypt(selectedBank);
        const encryptedAccount = encrypt(account);

        API.setAccountData(user.creatorId, encryptedBank, encryptedAccount);

        const updatedUserData = Object.assign(
            { ...user },
            {
                bank: encryptedBank,
                account: encryptedAccount,
            },
        );
        setUser(updatedUserData);
        setLoading(false);
        history.replace('/profile');
    };

    useLayoutEffect(() => {
        if (user.account) history.replace('/');
    }, []);

    return (
        <Container>
            <Form onSubmit={onSubmitAccount}>
                <h2 className="payment-header">계좌 등록</h2>
                <label className="payment-label" htmlFor="bank">
                    은행
                </label>
                <StyledSelect
                    id="bank"
                    value={selectedBank}
                    onInput={onInputBank}
                >
                    {bankList.map((bankName) => (
                        <option value={bankName} key={bankName}>
                            {bankName}
                        </option>
                    ))}
                </StyledSelect>
                <label className="payment-label" htmlFor="account">
                    계좌번호
                </label>

                <StyledInput
                    id="account"
                    type="text"
                    name="Account"
                    placeholder="계좌번호를 입력해주세요"
                    required
                    value={account}
                    onChange={onChangeAccount}
                />
                <span className="account-rule">
                    숫자만 입력해주세요('-' 제외)
                </span>
                {error && <span className="account-error">{error}</span>}
                <StyledButton type="submit">
                    {!loading ? (
                        '등록'
                    ) : (
                        <FontAwesomeIcon icon={faSpinner} spin={true} />
                    )}
                </StyledButton>
            </Form>
        </Container>
    );
}

export default Payment;
