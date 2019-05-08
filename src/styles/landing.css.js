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
    margin-top: 3rem;

    &.login {
      background-color: #19b9e9;
      color: #ebecf1;
    }

    &.logout {
      background-color: #ebecf1;
      color: #1f4773;
    }
  }
`;
