import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

function SideBar() {
    const [toggle, setToggle] = useState(false);

    return <>
        <IconContext.Provider value={{ color: '#A9A9A9', size: "18" }}>
            <div>
                <nav className="navbar">
                    <div className='navbar-content'>
                        <span className='span-tittle'>Geral</span>
                        <ul className='nav-menu-items' >
                            {SideBarData.map((item, index) => {
                                return (
                                    <li className='nav-text' key={index}>
                                        <NavLink to={item.path} activeClassName="active">
                                            {item.icon}
                                            <span >{item.title}</span>
                                        </NavLink >
                                    </li>
                                );
                            })
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </IconContext.Provider>
    </>;
}

export default SideBar;
