import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        className: "nav-text"
    },
    {
        title: "Lançamentos",
        path: "/Lancamento",
        icon: <IoIcons.IoIosAddCircle />,
        className: "nav-text"
    },
    {
        title: "Balancete",
        path: "/Balancete",
        icon: <AiIcons.AiFillHome />,
        className: "nav-text"
    }
];