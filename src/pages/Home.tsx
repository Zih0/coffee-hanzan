import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import NicknameInput from "../components/Input/NicknameInput";
import { Mobile, PC } from "../styles/MediaQuery";
import { useState } from "react";

const Container = styled.main`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .home-text {
    width: 70%;
    line-height: 5rem;
    font-size: 3rem;
    font-weight: 300;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1.2rem;
      line-height: 3rem;
    }
  }

  .home-start {
    display: flex;
    gap: 1rem;

    @media ${({ theme }) => theme.size.mobile} {
      flex-direction: column;

      .home-start-text {
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

function Home() {
  const [nickname, setNickname] = useState("");
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNickname(value);
  };
  return (
    <Container>
      <div className="home-text">
        Paypal, Stripe
        <br />
        한국에서 사용하기 불편하잖아요
        <br />
        커피한잔으로 후원을 받아보세요
      </div>
      <div className="home-start">
        <NicknameInput value={nickname} onChange={onChangeNickname} />
        <Link to="/signup">
          <PC>
            <Button height={5}>시작하기</Button>
          </PC>
          <Mobile>
            <Button height={3} width={19}>
              시작하기
            </Button>
          </Mobile>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
