import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import NicknameInput from "../components/Input/NicknameInput";
import { AuthContext } from "../contexts/AuthContext";
import { API } from "../firebase/api";
import { isValidEmpty, isValidEn, isValidLength } from "../utils/validation";

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .setting-header {
    font-size: 2rem;
    font-weight: 800;
  }

  .set-nickname {
    display: flex;
    gap: 1rem;
    position: relative;

    .nickname-error {
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      color: tomato;
    }

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;
    }
  }
`;

function Setting() {
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    API.getUserDocument(auth?.uid)
      .then((exUser) => {
        if (exUser.length !== 0) history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onApplyClick = async () => {
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

      // 사실상 거치지 않음
      const exUser = await API.getUserDocument(auth?.uid);
      if (exUser.length !== 0) {
        setError("이미 닉네임을 등록하였습니다.");
        setLoading(false);
        return;
      }

      await API.setUserData({
        nickname,
        createdAt: Date.now(),
        creatorId: auth?.uid,
      });
      setLoading(false);
      history.push("/set-payment");
    } catch (error: any) {
      setError(error.toString());
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setError("");
    setNickname(value);
  };

  return (
    <Container>
      <h2 className="setting-header">닉네임 설정</h2>
      <div className="set-nickname">
        <NicknameInput value={nickname} onChange={onChange} />
        {error && <span className="nickname-error">{error}</span>}
        <Button onClick={onApplyClick}>
          {!loading ? "등록" : <FontAwesomeIcon icon={faSpinner} spin={true} />}
        </Button>
      </div>
      <span>닉네임은 영문과 숫자로 4글자 이상 작성해주세요 ✍🏻</span>
    </Container>
  );
}

export default Setting;
