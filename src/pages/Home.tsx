import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import Button from '../components/Button';

const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  .home-text {
    width: 70%;
    line-height: 3rem;
    font-size: 1.1rem;
    font-weight: 400;
  }

  .home-start {
    display: flex;
    gap: 1rem;

    .home-start-text {
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

    @media ${(props) => props.theme.mobile} {
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
  const themeContext = useContext(ThemeContext);
  return (
    <Container>
      <div className="home-text">
        커피한잔은 미국 Buy me a Coffee를 따라한 프로젝트입니다.
        <br />
        Paypal, Stripe는 한국 사용자가 후원 하고, 받는데 불편함이 있어 이를
        해결하고자 만들게 되었습니다.
        <br />
        커피한잔을 이용해 후원을 받아보세요.
      </div>
      <div className="home-start">
        <div className="home-start-text">
          <h1>onecoffee.xyz/</h1>
          <input type="text" placeholder="yourname" />
        </div>

        <Button background={themeContext.primaryColor} color="black">
          <Link to="/signup">시작하기</Link>
        </Button>
      </div>
    </Container>
  );
}

export default Home;
