import styled from 'styled-components';

export const MenuToggle = styled.div`
  cursor: pointer;
  transition: 400ms;
  position: fixed;
  top: 1rem;
  left: ${props => props.menu
    ? '72%'
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
  position: fixed;
  width: 70%;
  height: 100%;
  left: ${props => props.menu ? 0 : '-70%'};
  top: 0;
  transition: 400ms;
  background-color: rgba(31, 71, 115, 0.8);
  backdrop-filter: blur(20px);
  z-index: 5;

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
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-height: 600px) {
      margin: 3rem 0;
    }

    &:first-of-type {
      margin-top: 5rem;
    }

    > a {
      color: #e5e5e5;
      text-decoration: none;
      font-size: 2.5rem;

      &.active {
        font-weight: bold;
      }
    }

    > button {
      outline: none;
      border: none;
      padding: .5em 2em;
      border-radius: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
