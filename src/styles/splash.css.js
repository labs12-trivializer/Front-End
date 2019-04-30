import styled, { keyframes, css } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeAnimation = css`${fadeOut} 1s ease-out both`;

const changeGradient = keyframes`
  from {
    background: linear-gradient(180deg, #1F4773 0%, rgba(255, 255, 255, 0) 100%), #0F8A99;
  }
  to {
    background: linear-gradient(180deg, #1F4773 0%, rgba(255, 255, 255, 0) 100%), #1F4773;
  }
`;

const gradientAnimation = css`${changeGradient} 1s ease-out both`;

export const Background = styled.div`
  animation: ${gradientAnimation};
  animation-delay: 2s;
  /* overflow: hidden; */
  width: 100vw;
  height: 100vh;
`;

export const Logo = styled.h1`
  position: absolute;
  animation: ${fadeAnimation};
  animation-delay: 1.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Grand Hotel', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 10rem;
  line-height: 196px;
  letter-spacing: 0.03em;
  color: #25E1D2;
  height: 100vh;
  width: 100vw;
  bottom: 50px;
`;

export const Trivia = styled.h2`
  position: absolute;
  animation: ${fadeAnimation};
  animation-delay: 1.5s;
  font-family: Grand Hotel;
  font-style: normal;
  font-weight: normal;
  font-size: 3.8rem;
  line-height: 65px; /* identical to box height */
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.03em;
  text-transform: lowercase;
  color: #EBECF1;
  height: 100vh;
  width: 100vw;
  top: 30px;
`;
