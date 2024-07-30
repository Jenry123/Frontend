import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/reports.scss';
import { Outlet } from 'react-router-dom';

const CardButton = ({ props }) => {
    return (
        <>
            <div className='container-direction'>
                {props.map((item, index) => (
                    <div key={index} className='card-group'>
                        <li>
                            <NavLink
                                to={item.path}
                                className='list-style-buttons'
                                activeClassName='active' // Añade esta línea para aplicar una clase activa
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    </div>
                ))}


            </div>

           

        </>

    );
}

export default CardButton;
