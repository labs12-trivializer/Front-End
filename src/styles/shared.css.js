import styled, { css } from 'styled-components';
import dd from 'react-dropdown';

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #1f4773, #0f8a99);
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  flex: 1;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  outline: none;
  margin: 1rem;
  border-radius: 1rem;
  color: #ebecf1;
  border: 2px solid #19b9e9;
  background-color: #19b9e9;
  &:hover {
    background-color: #ebecf1;
    color: #19b9e9;
  }

  ${props =>
    props.secondary &&
    css`
      color: #1f4773;
      border: 2px solid #ebecf1;
      background-color: #ebecf1;

      &:hover {
        background-color: #1f4773;
        color: #ebecf1;
      }
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
