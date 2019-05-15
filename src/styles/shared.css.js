import styled from 'styled-components';

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
