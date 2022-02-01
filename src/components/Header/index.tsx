import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useModal from "../../hooks/useModal";
import { Mobile, PC } from "../../styles/MediaQuery";
import Button from "../Button";
import LoginModal from "../Modal/LoginModal";
import { IconLogo } from "../../assets/icons";

const Container = styled.header`
  height: 2rem;
  margin: 2rem 3rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;

  .header-logo {
    display: flex;
    align-items: center;
    svg {
      height: 3rem;
      width: auto;
    }

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 1rem;

      svg {
        height: 1.5rem;
      }
    }
  }

  .header-auth {
    display: flex;
    align-items: center;
    gap: 2rem;

    .header-login {
      font-size: 1.2rem;
      transition: all 0.3s;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid #000;
      }
    }

    @media ${({ theme }) => theme.size.mobile} {
      gap: 1rem;
      .header-login {
        font-size: 0.8rem;
      }
    }
  }
`;

function Header() {
  const { currentUser } = useContext(AuthContext);
  const { openModal, ModalPortal } = useModal();

  return (
    <Container>
      <Link to="/">
        <div className="header-logo">
          <IconLogo />
        </div>
      </Link>
      <div className="header-auth">
        {currentUser ? (
          <Link to="profile">
            <div>mypage</div>
          </Link>
        ) : (
          <>
            <p className="header-login" onClick={openModal}>
              로그인
            </p>

            <Link to="signup">
              <PC>
                <Button size="md">회원가입</Button>
              </PC>
              <Mobile>
                <Button size="sm">회원가입</Button>
              </Mobile>
            </Link>
          </>
        )}
      </div>
      {!currentUser && (
        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      )}
    </Container>
  );
}

export default Header;
