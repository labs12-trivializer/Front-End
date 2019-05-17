import styled, { css } from 'styled-components';
import dd from 'react-dropdown';

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #1f4773, #0f8a99);
`;

export const Title = styled.h1`
  margin-bottom: 4rem;
  font-family: cursive;
  font-size: 4rem;
  letter-spacing: 0.03em;
  color: white;
  text-align: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const Button = styled.button`
  flex: 1;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  outline: none;
  color: rgb(37, 225, 210);
  background: transparent;
  box-shadow: transparent 0px 0px 1px;
  text-align: center;
  transform: perspective(1px) translateZ(0px);
  transition-duration: 300ms;
  border-width: 1px;
  border-style: solid;
  border-color: initial;
  border-image: initial;
  border-radius: 1rem;
  text-decoration: none;
  margin-bottom: 1rem;


  &:hover {
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 8px;
  }

  ${props =>
    props.small &&
    css`
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      align-self: flex-end;
      border-radius: 0.5rem;
      transform: none;
      &:hover {
        letter-spacing: 0px;
      }
    `}

  ${props =>
    props.secondary &&
    css`
      color: #bdbdbd;
    `}

  ${props =>
    props.error &&
    css`
      color: #ef9a9a;
    `}

  ${props =>
    props.warning &&
    css`
      color: #ffeb3b;
    `}

  ${props =>
    props.success &&
    css`
      color: #64dd17;
    `}

  ${props =>
    props.primary &&
    css`
      color: white;
      border-color: #19b9e9;
    `}
`;

export const Dropdown = styled(dd)`
  .Dropdown-control {
    border-radius: 0;
    padding: 0.8rem 5.2rem 0.8rem 1rem;
    font-size: 1.8rem;
  }

  .Dropdown-menu {
    font-size: 1.8rem;
  }
`;

export const TextInput = styled.input`
  font-size: 1.8rem;
  padding: 0.8rem 5.2rem 0.8rem 1rem;
  flex: 1;
`;
