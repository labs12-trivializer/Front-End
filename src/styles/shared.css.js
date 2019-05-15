import styled, { css } from 'styled-components';

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
  margin-top: 8rem;
  margin-bottom: 4rem;
  font-family: cursive;
  font-size: 4rem;
  letter-spacing: 0.03em;
  color: #ebecf1;
  text-align: center;
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
  margin: 2rem 1rem 0rem;
  border-radius: 1rem;
  color: #ebecf1;
  border: 2px solid #19b9e9;
  background-color: #19b9e9;
  transition: 250ms;
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
