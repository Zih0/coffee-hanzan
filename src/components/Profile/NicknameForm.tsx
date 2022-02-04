import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../Input";
import { isValidEmpty, isValidEn, isValidLength } from "../../utils/validation";
import { API } from "../../firebase/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

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

function NicknameForm() {
  const { user } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user.nickname ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setError("");
    setNickname(value);
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
      const validation = await API.checkDuplicateNickName(user.creatorId, nickname);
      if (!validation) {
        setError("이미 사용중인 닉네임입니다.");
        setLoading(false);
        return;
      }

      await API.updateUserNickname(user.creatorId, nickname);
      setLoading(false);

      // TODO: 닉네임 변경 성공 토스트
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
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
  );
}

export default NicknameForm;
