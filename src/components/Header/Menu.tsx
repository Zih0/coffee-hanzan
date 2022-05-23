import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '@contexts/AuthContext';

import { API } from '@firebase/api';

function Menu() {
    const { setUser, setIsLoggedIn } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const history = useHistory();

    const onToggleDropdown = useCallback(() => {
        setOpenDropdown((prev) => !prev);
    }, []);

    const onClickMypage = () => {
        history.push('/profile');
    };

    const onClickLogout = useCallback(() => {
        API.logout();
        setIsLoggedIn(false);
        setUser({
            creatorId: '',
            createdAt: 0,
        });
    }, []);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener('mousedown', clickOutside);
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, [dropdownRef]);

    return (
        <Container ref={dropdownRef}>
            <button className="menu-button" onClick={onToggleDropdown}>
                <FontAwesomeIcon icon={faUser} />
            </button>

            {openDropdown && (
                <Items>
                    <li
                        className="menu-dropdown-item"
                        onMouseDown={onClickMypage}
                    >
                        <p className="menu-dropdown-item-text">마이페이지</p>
                    </li>
                    <li
                        className="menu-dropdown-item"
                        onMouseDown={onClickLogout}
                    >
                        <p className="menu-dropdown-item-text">로그아웃</p>
                    </li>
                </Items>
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

    .menu-button {
        background-color: ${({ theme }) => theme.color.white};
        cursor: pointer;
        display: flex;
        align-items: center;
        border: none;

        svg {
            width: 24px;
            height: 24px;
            color: ${({ theme }) => theme.color.black};
        }
        path {
            fill: ${({ theme }) => theme.color.black};
        }
    }
`;

const Items = styled.ul`
    overflow: hidden;
    position: absolute;
    top: 28px;
    right: 0;
    width: 160px;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.gray};
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
    z-index: 10;

    .menu-dropdown-item {
        list-style: none;
        display: block;
        padding: 12px 24px 12px 16px;
        cursor: pointer;

        &:hover {
            background-color: ${({ theme }) => theme.color.gray_100};
        }

        .menu-dropdown-item-text {
            font-size: 14px;
            letter-spacing: -0.21px;
            color: ${({ theme }) => theme.color.black};
        }
    }
`;

export default Menu;
