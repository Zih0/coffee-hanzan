import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { bankList } from "../../utils/constants";
import Input from "../Input";
import Select from "../Select";

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
    margin-bottom: 2rem;

    position: relative;

    .nickname-error {
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

  .profile-nickname-wrapper {
    display: flex;
    gap: 1rem;
  }

  .profile-form-input {
    width: 100%;
  }
`;

const StyledInput = styled(Input)`
  padding: 1rem;
`;
function AccountForm() {
  const { user, auth } = useContext(AuthContext);
  const [bank, setBank] = useState(user.bank ?? "");
  const [account, setAccount] = useState(user.account ?? "");

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
    setAccount(value);
  };

  return (
    <Form>
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
        <p className="profile-form-label">계좌번호</p>
        <StyledInput
          className="profile-form-input"
          placeholder="계좌번호를 입력해주세요"
          value={account}
          onChange={onChangeAccount}
        />
      </div>
    </Form>
  );
}

export default AccountForm;
