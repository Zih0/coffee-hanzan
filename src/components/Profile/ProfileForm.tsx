import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { API } from "../../firebase/api";
import { bankList } from "../../utils/constants";
import { isValidEmpty, isValidEn, isValidLength } from "../../utils/validation";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

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

function ProfileForm() {
  const { user, auth } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user.nickname ?? "");
  const [bank, setBank] = useState(user.bank ?? "");
  const [account, setAccount] = useState(user.account ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setError("");
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

  const onSubmitNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedNickname = nickname.trim();

    if (isValidEmpty(trimmedNickname)) {
      setError("닉네임을 입력해주세요.");
      return;
    } else if (!isValidLength(trimmedNickname)) {
      setError("닉네임은 최소 4글자 이상 입력해주세요.");
      return;
    } else if (!isValidEn(trimmedNickname)) {
      setError("영문과 숫자로만 닉네임을 적어주세요");
      return;
    }

    setLoading(true);

    try {
      const validation = await API.checkDuplicateNickName(auth?.uid, nickname);
      if (!validation) {
        setError("이미 사용중인 닉네임입니다.");
        setLoading(false);
        return;
      }

      await API.updateUserNickname(auth?.uid, nickname);
      setLoading(false);

      // TODO: 닉네임 변경 성공 토스트
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitNickname}>
        <div className="profile-input-wrapper">
          <p className="profile-form-label">닉네임</p>
          <div className="profile-nickname-wrapper">
            <StyledInput
              className="profile-form-input"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={onChangeNickname}
            />
            <Button size="sm">
              {!loading ? (
                "수정"
              ) : (
                <FontAwesomeIcon icon={faSpinner} spin={true} />
              )}
            </Button>
          </div>
          {error && <span className="nickname-error">{error}</span>}
        </div>
      </Form>
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
    </Container>
  );
}

export default ProfileForm;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
