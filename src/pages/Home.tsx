import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { Mobile, PC } from "../styles/MediaQuery";

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

    @media ${(props) => props.theme.mobile} {
      font-size: 1.5rem;
      line-height: 3rem;
    }
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
  return (
    <Container>
      <div className="home-text">
        Paypal, Stripe
        <br />
        한국에서 사용하기 불편하잖아요
        <br />
        커피한잔을 이용해 후원을 받아보세요
      </div>
      <div className="home-start">
        <div className="home-start-text">
          <h1>onecoffee.xyz/</h1>
          <input type="text" placeholder="yourname" />
        </div>
        <Link to="/signup">
          <PC>
            <Button height={5}>시작하기</Button>
          </PC>
          <Mobile>
            <Button height={3} width={17}>
              시작하기
            </Button>
          </Mobile>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
