import { useState } from 'react';
import './Main.scss';
import BackIcon from '../../../assets/icons/back.svg';
import HeaderIcon from '../../../assets/icons/header.svg';
import ArrowIcon from '../../../assets/icons/arrow.svg';
import SquareIcon from '../../../assets/icons/square.svg';
import { Table } from '../Table/Table';


interface MenuItem {
    label: string;
    link?: string;
}

interface MenuProps {
    headerList: MenuItem[];
    menuList: MenuItem[];
}

export function Main({ headerList, menuList }: MenuProps) {
    const [activeHeaderItem, setActiveHeaderItem] = useState<number | null>(null);
    const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
    const [showMenu, setShowMenu] = useState(true);


    const handlePageClick = (index: number) => {
        setActiveHeaderItem(index);
    };

    const handleMenuClick = (index: number) => {
        setActiveMenuItem(index);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    const TitleList = [
        "Уровень", "Наименование работ", "Основная з/п", "Оборудование", "Накладные расходы", "Сметная прибыль"
    ]
    return (
        <div className="main">
            <div className="container">
                <div className="header-buttons">
                    <HeaderIcon />
                    <BackIcon />
                </div>
                <ul className="header-list">
                    {headerList.map((item, index) => (
                        <li
                            key={index}
                            className={`header-item ${activeHeaderItem === index ? "active" : ""}`}
                            onClick={() => handlePageClick(index)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container">
                <div className="menu-button" onClick={toggleMenu}>
                    <div>
                        <div>Название проекта</div>
                        <div className="sm-text">Аббревиатура</div>
                    </div>
                    <ArrowIcon className={`arrow ${showMenu ? "rotated" : ""}`} />
                </div>
                <div className="title">Строительно-монтажные работы</div>
            </div>

            <div className="page-content">
                <div className={`menu ${showMenu ? "show" : ""}`}>
                    <ul className="menu-list">
                        {menuList.map((item, index) => (
                            <li
                                key={index}
                                className={`menu-item ${activeMenuItem === index ? "active" : ""}`}
                                onClick={() => handleMenuClick(index)}
                            >
                                <SquareIcon />
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`content ${showMenu ? "menu-open" : ""}`}>
                    <Table titleList={TitleList} />
                </div>
            </div>
        </div>
    );
};