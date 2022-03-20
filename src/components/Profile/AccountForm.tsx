import React, { useContext, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../firebase/api";
import { bankList } from "../../utils/constants";
import { decrypt, encrypt } from "../../utils/crypto";
import { isValidAccountLength, isValidNumber } from "../../utils/validation";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { toast } from "react-toastify";

const Form = styled.form`
  width: 50%;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
  }

  .profile-input-wrapper {
    display: block;

    position: relative;

    .account-error {
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      color: tomato;
    }
  }

  .profile-form-label {
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .profile-form-input {
    width: 100%;
  }

  .margin-top-2 {
    margin-top: 2rem;
  }
`;

const StyledInput = styled(Input)`
  padding: 1rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

function AccountForm() {
  const { user, setUser } = useContext(AuthContext);
  const [bank, setBank] = useState(decrypt(user.bank as string) ?? "");
  const [account, setAccount] = useState(decrypt(user.account as string) ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onInputBank = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setBank(value);
  };

  const onChangeAccount = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setError("");
    setAccount(value);
  };

  const onSubmitAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidNumber(account)) {
      setError("계좌번호에 숫자만 입력해주세요.");
      return;
    }
    if (!isValidAccountLength(account)) {
      setError("계좌번호를 다시 확인해주세요.");
      return;
    }
    setLoading(true);

    const encryptedBank = encrypt(bank);
    const encryptedAccount = encrypt(account);

    await API.setAccountData(user.creatorId, encryptedBank, encryptedAccount);
    setLoading(false);

    const updatedUserData = Object.assign(
      { ...user },
      {
        bank: encryptedBank,
        account: encryptedAccount,
      }
    );
    setUser(updatedUserData);
    toast.success("성공적으로 수정되었습니다.");
  };

  return (
    <Form onSubmit={onSubmitAccount}>
      <div className="profile-input-wrapper">
        <p className="profile-form-label">은행</p>
        <Select
          className="profile-form-input"
          value={bank}
          onInput={onInputBank}
        >
          {bankList.map((bankName) => (
            <option value={bankName} key={bankName}>
              {bankName}
            </option>
          ))}
        </Select>
      </div>
      <div className="profile-input-wrapper">
        <p className="profile-form-label margin-top-2">계좌번호</p>
        <StyledInput
          className="profile-form-input"
          placeholder="계좌번호를 입력해주세요"
          value={account}
          onChange={onChangeAccount}
        />
        <StyledButton size="sm" type="submit">
          {!loading ? (
            "계좌번호 수정하기"
          ) : (
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          )}
        </StyledButton>
        {error && <span className="account-error">{error}</span>}
      </div>
    </Form>
  );
}

export default AccountForm;
