import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIsLoggedIn } from '../../contexts/AuthContext';
import useModal from '../../hooks/useModal';
import { Mobile, PC } from '../../styles/MediaQuery';
import Button from '../common/Button';
import LoginModal from '../Modal/LoginModal';
import { IconLogo } from '../../assets/icons';
import Menu from './Menu';

function Header() {
  const isLoggedIn = useIsLoggedIn();
  const { openModal, ModalPortal } = useModal();

  return (
    <>
      <Container>
        <div className='header-wrapper'>
          <Link to='/'>
            <div className='header-logo'>
              <IconLogo />
            </div>
          </Link>
          <div className='header-auth'>
            {isLoggedIn ? (
              <Menu />
            ) : (
              <>
                <p className='header-login' onClick={openModal}>
                  로그인
                </p>

                <Link to='signup'>
                  <PC>
                    <Button>회원가입</Button>
                  </PC>
                  <Mobile>
                    <Button>회원가입</Button>
                  </Mobile>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
      {!isLoggedIn && (
        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      )}
    </>
  );
}

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;

  .header-wrapper {
    width: 92%;
    max-width: 1240px;
    padding: 2rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.size.mobile} {
      padding: 1rem;
    }
  }

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
        height: 2rem;
      }
    }
  }

  .header-auth {
    display: flex;
    align-items: center;
    gap: 2rem;

    .header-login {
      font-size: 0.8rem;
      transition: all 0.3s;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid ${({ theme }) => theme.color.black};
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

export default Header;
