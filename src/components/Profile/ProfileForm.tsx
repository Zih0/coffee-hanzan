import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { bankList } from "../../utils/constants";
import Input from "../Input";
import Select from "../Select";

const Container = styled.form`
  width: 50%;

  .profile-input-wrapper {
    display: block;
    margin-bottom: 2rem;
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
`;

const StyledInput = styled(Input)`
  padding: 1rem;
`;

function ProfileForm() {
  const { user } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user.nickname);
  const [bank, setBank] = useState(user.bank ?? "");
  const [account, setAccount] = useState(user.account ?? "");

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNickname(value);
  };

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
    <Container>
      <div className="profile-input-wrapper">
        <p className="profile-form-label">닉네임</p>
        <StyledInput
          className="profile-form-input"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={onChangeNickname}
        />
      </div>
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
    </Container>
  );
}

export default ProfileForm;
