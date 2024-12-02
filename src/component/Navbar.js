import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../App.css';

const Navbar = () => {
    const menuList = [
        { name: 'Home', path: '/main' },
        { name: '스케줄러', path: '/scheduler' },
        { name: '공부방', path: '/studyroom' },
        { name: '랭킹', path: '/ranking' },
        { name: '마이페이지', path: '/mypage' },
    ];
    const [activeMenu, setActiveMenu] = useState('Home'); // 초기값: 'Home'
    const navigate = useNavigate(); // 경로 이동을 위한 훅

    return (
        <nav className="navbar">
            <ul className="menu-list">
                {menuList.map((menu, index) => (
                    <li
                        key={index}
                        className={`menu-item ${activeMenu === menu.name ? 'active' : ''}`}
                        onClick={() => {
                            setActiveMenu(menu.name); // 활성화 상태 변경
                            navigate(menu.path); // 경로로 이동
                        }}
                    >
                        {menu.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;