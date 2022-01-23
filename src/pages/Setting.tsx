import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { dbService } from "../fbase";

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
    .set-nickname-text {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      border-radius: 5px;
      background-color: ${(props) => props.theme.grayColor};
      flex-wrap: wrap;
      h1 {
        font-size: 2rem;
        font-weight: 900;
      }
      input {
        width: 10rem;
        border: none;
        height: 2rem;
        background-color: ${(props) => props.theme.grayColor};
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
    }

    .nickname-error {
      position: absolute;
      bottom: -1.5rem;
      left: 0;
      color: tomato;
    }

    @media ${(props) => props.theme.mobile} {
      flex-direction: column;

      .set-nickname-text {
        h1 {
          font-size: 1rem;
        }
        input {
          width: 5rem;
          font-size: 1rem;
          height: 1rem;
          margin-bottom: 0.25rem;
        }
      }
    }
  }
`;

function Setting() {
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const getExUser = async (uid: string) => {
    const exUser = await dbService
      .collection("user")
      .where("creatorId", "==", uid)
      .get();
    return exUser;
  };

  const getExNickname = async (nickname: string) => {
    const exNickname = await dbService
      .collection("user")
      .where("nickname", "==", nickname)
      .get();
    return exNickname;
  };

  const isValidEmpty = (nickname: string) => {
    return nickname.trim() === "";
  };

  const isValidLength = (nickname: string) => {
    return nickname.trim().length >= 4;
  };

  const isValidEn = (nickname: string) => {
    const regEngNum = /^[a-zA-Z0-9]+$/;

    return regEngNum.test(nickname.trim());
  };

  useEffect(() => {
    getExUser(currentUser.uid)
      .then((exUser) => {
        if (exUser.docs.length !== 0) history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onApplyClick = async () => {
    const trimmedNickname = nickname.trim();

    if (isValidEmpty(trimmedNickname)) {
      setError(() => "닉네임을 입력해주세요.");
      return;
    } else if (!isValidLength(trimmedNickname)) {
      setError(() => "닉네임은 최소 4글자 이상 입력해주세요.");
      return;
    } else if (!isValidEn(trimmedNickname)) {
      setError(() => "영문과 숫자로만 닉네임을 적어주세요");
      return;
    }

    setLoading(true);
    const userObj = {
      nickname,
      createdAt: Date.now(),
      creatorId: currentUser.uid,
    };

    try {
      const exNickname = await getExNickname(nickname);
      if (exNickname.docs.length !== 0) {
        setError(() => "이미 사용중인 닉네임입니다.");
        setLoading(false);
        return;
      }

      const exUser = await getExUser(currentUser.uid);
      if (exUser.docs.length !== 0) {
        setError(() => "이미 닉네임을 등록하였습니다.");
        setLoading(false);
        return;
      }

      await dbService.collection("user").add(userObj);
      setLoading(false);
      history.push("/set-payment");
    } catch (error: any) {
      console.log(error);
      setError(() => error.toString());
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
        <div className="set-nickname-text">
          <h1>onecoffee.xyz/</h1>
          <input type="text" placeholder="yourname" onChange={onChange} />
          {error && <span className="nickname-error">{error}</span>}
        </div>
        <Button onClick={onApplyClick}>
          {!loading ? "등록" : <FontAwesomeIcon icon={faSpinner} spin={true} />}
        </Button>
      </div>
      <span>닉네임은 영문과 숫자로 4글자 이상 작성해주세요 ✍🏻</span>
    </Container>
  );
}

export default Setting;
