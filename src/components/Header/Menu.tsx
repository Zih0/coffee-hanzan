import React, { useCallback, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { API } from '../../firebase/api';
import { AuthContext } from '../../contexts/AuthContext';

function Menu() {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const history = useHistory();

  const onToggleDropdown = useCallback(() => {
    setOpenDropdown((prev) => !prev);
  }, []);

  const onBlurDropdown = useCallback(() => {
    setOpenDropdown(false);
  }, []);

  const onClickMypage = () => {
    history.push('/profile');
  };

  const onClickLogout = () => {
    API.logout();
    setIsLoggedIn(false);
    setUser({
      creatorId: '',
      createdAt: 0,
    });
  };

  return (
    <Container>
      <button
        className='menu-button'
        onBlur={onBlurDropdown}
        onClick={onToggleDropdown}
      >
        <FontAwesomeIcon icon={faUser} />
      </button>

      {openDropdown && (
        <ul className='menu-dropdown'>
          <li className='menu-dropdown-item' onMouseDown={onClickMypage}>
            <p className='menu-dropdown-item-text'>마이페이지</p>
          </li>
          <li className='menu-dropdown-item' onMouseDown={onClickLogout}>
            <p className='menu-dropdown-item-text'>로그아웃</p>
          </li>
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-top: 12px;

  .menu-button {
    background-color: ${({ theme }) => theme.color.white};
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .menu-dropdown {
    overflow: hidden;
    position: absolute;
    top: 28px;
    right: 0;
    width: 160px;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.gray};
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
    z-index: 10;
  }

  .menu-dropdown-item {
    list-style: none;
    display: block;
    padding: 12px 24px 12px 16px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.color.gray};
    }

    .menu-dropdown-item-text {
      font-size: 14px;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.color.black};
    }
  }
`;

export default Menu;
