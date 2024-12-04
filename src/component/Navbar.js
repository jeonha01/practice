import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useNavigate 추가
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const MenuList = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const MenuItem = styled.li`
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:focus {
        outline: none;
    }

    &.active {
        color: black;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 8px 0;
    }
`;

const Navbar = () => {
    const menuList = [
        { name: 'Home', path: '/main' },
        { name: '스케줄러', path: '/scheduler' },
        { name: '공부방', path: '/studyroom' },
        { name: '랭킹', path: '/ranking' },
        { name: '마이페이지', path: '/mypage' },
    ];
    const [activeMenu, setActiveMenu] = useState(''); // 초기값: 'Home'
    const navigate = useNavigate(); // 경로 이동을 위한 훅
    const location = useLocation();

    // 현재 경로에 따라 활성화된 메뉴 설정
    useEffect(() => {
        const currentMenu = menuList.find(menu => menu.path === location.pathname);
        if (currentMenu) {
            setActiveMenu(currentMenu.name);
        }
    }, [location.pathname, menuList]);

    return (
        <NavbarContainer>
            <MenuList>
                {menuList.map((menu, index) => (
                    <MenuItem
                        key={index}
                        className={activeMenu === menu.name ? 'active' : ''}
                        onClick={() => {
                            setActiveMenu(menu.name); // 활성화 상태 변경
                            navigate(menu.path); // 경로로 이동
                        }}
                    >
                        {menu.name}
                    </MenuItem>
                ))}
            </MenuList>
        </NavbarContainer>
    );
};

export default Navbar;