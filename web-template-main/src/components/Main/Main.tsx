import { useState } from 'react';
import './Main.scss';
import BackIcon from '../../../assets/icons/back.svg';
import HeaderIcon from '../../../assets/icons/header.svg';
import ArrowIcon from '../../../assets/icons/arrow.svg';
import SquareIcon from '../../../assets/icons/square.svg';
import { Table } from '../Table/Table';

export function Main() {
    const [activeHeaderItem, setActiveHeaderItem] = useState(0);
    const [activeMenuItem, setActiveMenuItem] = useState(4);
    const [showMenu, setShowMenu] = useState(true);

    const headerList = [
        { label: 'Просмотр', link: '1' },
        { label: 'Управление', link: '2' }
    ]

    const menuList = [
        { label: 'По проекту', link: '1' },
        { label: 'Объекты', link: '2' },
        { label: 'РД', link: '3' },
        { label: 'МТО', link: '4' },
        { label: 'СМР', link: '5' },
        { label: 'График', link: '6' },
        { label: 'МиМ', link: '7' },
        { label: 'Рабочие', link: '8' },
        { label: 'Капвложения', link: '9' },
    ]

    const TitleList = [
        "Уровень", "Наименование работ", "Основная з/п", "Оборудование", "Накладные расходы", "Сметная прибыль"
    ]

    const handlePageClick = (index: number) => {
        setActiveHeaderItem(index);
    };

    const handleMenuClick = (index: number) => {
        setActiveMenuItem(index);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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
                    <ArrowIcon className={`arrow ${!showMenu && "rotated"}`} />
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