import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ toggleSidebarProp }) => {
  //toggleSidebar przekazujemy w propsie z rodzica czyli SmallSidebar  -bo tam potrzebujemy zamkniecia modala
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebarProp}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
