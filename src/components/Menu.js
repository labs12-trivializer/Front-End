import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../auth';

// STYLES
import {
  MenuToggle,
  SideMenu
} from '../styles/menu.css';

const Menu = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  const logout = () => auth.logout();
  const isLoggedIn = auth.isAuthenticated();

  return (
    <nav>
      <MenuToggle onClick={toggleMenu} menu={menu}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </MenuToggle>
      <SideMenu menu={menu}>
        <h1>TVZ</h1>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/games">Games</NavLink>
        </div>
        <div>
          <NavLink to="/billing">Billing</NavLink>
        </div>
        <div>
          <NavLink to="/settings">Settings</NavLink>
        </div>
        {isLoggedIn && (
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </SideMenu>
    </nav>
  );
};

export default Menu;
