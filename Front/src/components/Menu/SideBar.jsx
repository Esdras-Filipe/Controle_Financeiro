import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import './SideBar.css';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

function SideBar() {
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
                                        <Link to={item.path} >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
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
