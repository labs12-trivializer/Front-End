import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #1F4773, #0F8A99);
`;

export const MenuToggle = styled.div`
  cursor: pointer;
  transition: 400ms;
  position: absolute;
  left: ${props => props.menu
    ? '73%'
    : '1.5rem'
  };

  > div {
    width: 3.5rem;
    height: .5rem;
    background-color: #80B5E8;
    margin: .6rem 0;
    border-radius: 3px;
    transition: 400ms;

    &:nth-child(1) {
      transform: ${props => props.menu
        ? 'rotate(-45deg) translate(-8px, 7px)'
        : 'none'
      };
    }

    &:nth-child(2) {
      opacity: ${props => props.menu ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${props => props.menu
        ? 'rotate(45deg) translate(-8px, -8px)'
        : 'none'
      };
    }
  }
`;

export const SideMenu = styled.div`
  position: absolute;
  width: 70%;
  height: 100%;
  left: ${props => props.menu ? 0 : '-70%'};
  top: 0;
  transition: 400ms;
  background-color: rgba(31, 71, 115, 0.95);
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);

  > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 225px;
    font-family: 'Grand Hotel', cursive;
    font-size: 10rem;
    color: #25E1D2;
    border-bottom: 1px solid rgba(196, 196, 196, 0.5);
  }

  > div {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-of-type {
      margin-top: 5rem;
    }

    /* > svg {
      width: 4rem;
      margin-right: 1.5rem;
    }

    &:last-of-type > svg {
      width: 4.5rem;
      margin-right: .5rem;
    } */

    > a {
      color: #e5e5e5;
      text-decoration: none;
      font-size: 2.5rem;
    }
  }
`;

export const Header = styled.header`
  margin: 5rem auto;
  width: 80%;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 5rem;
    text-align: center;
    letter-spacing: .03em;
    color: #ebecf1;
  }

  > h2 {
    margin-top: -1rem;
    font-size: 2.5rem;
    text-align: center;
    letter-spacing: .03em;
    color: rgba(235, 236, 241, 0.5);
  }

  > p {
    font-size: 2rem;
    line-height: 1.25;
    color: #ebecf1;
    margin-top: 2.5rem;
    text-align: center;
  }

  > button {
    width: 90%;
    align-self: center;
    margin-top: 1.8rem;
    font-size: 1.8rem;
    font-weight: bold;
    padding: 1rem;
    border: none;
    cursor: pointer;

    &:first-of-type {
      margin-top: 3rem;
      background-color: #19b9e9;
      color: #ebecf1;
    }

    &:last-of-type {
      background-color: #ebecf1;
      color: #1f4773;
    }
  }
`;
