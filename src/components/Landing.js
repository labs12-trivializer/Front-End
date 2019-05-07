import React, { useState } from 'react';
import {
  Container,
  Background,
  MenuToggle,
  SideMenu,
  Header
} from '../styles/landing.css';

const Landing = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  return (
    <Container>
      <Background />
      <nav>
        <MenuToggle onClick={toggleMenu} menu={menu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </MenuToggle>
        <SideMenu menu={menu}>
          <h1>TVZ</h1>
          <div>
            <a href="#">Games</a>
          </div>
          <div>
            <a href="#">Billing</a>
          </div>
          <div>
            <a href="#">Settings</a>
          </div>
        </SideMenu>
      </nav>
      <Header>
        <h1>Trivia Games</h1>
        <h2>Tailored to your Bar</h2>
        <p>Trivializer helps bar trivia hosts create their question sets and answer sheets by pulling from a large database of trivia questions.</p>
        <button>Sign Up</button>
        <button>Learn More</button>
      </Header>
    </Container>
  );
};

export default Landing;
