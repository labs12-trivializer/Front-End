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
  background: linear-gradient(to bottom, #1f4773, #0f8a99);
`;

export const Header = styled.header`
  margin: 8rem auto;
  width: 80%;
  display: flex;
  flex-direction: column;

  > * {
    text-align: center;
  }

  > h1 {
    font-size: 4rem;
    letter-spacing: 0.03em;
    color: #ebecf1;
  }

  > h2 {
    margin-top: -1rem;
    font-size: 2rem;
    letter-spacing: 0.03em;
    color: rgba(235, 236, 241, 0.5);
  }

  > p {
    font-size: 1.8rem;
    line-height: 1.25;
    color: #ebecf1;
    margin-top: 2.5rem;
    text-align: unset;
  }

  > div.features {
    margin: 3rem auto;
    color: #d3dce1;
    text-align: unset;
    font-size: 1.5rem;

    > div {
      margin-bottom: 2rem;
      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    svg {
      min-width: 1.5rem;
      margin-right: 1rem;
    }

    span {
      border-bottom: 1px groove;
      padding-bottom: .5em;
    }
  }

  > div.buttons {
    display: flex;
    justify-content: ${props => props.isLoggedIn ? 'center' : 'space-between'};
    align-items: center;
    margin-top: 1rem;

    > button {
      font-size: 1.4rem;
      font-weight: bold;
      padding: 1rem;
      border: none;
      border-radius: 1rem;
      cursor: pointer;
      width: ${props => props.isLoggedIn ? '90%' : '49%'};

      &.login {
        background-color: #19b9e9;
        color: #ebecf1;
      }

      &.overview {
        background-color: #ebecf1;
        color: #1f4773;
      }

      > svg {
        margin-right: .5rem;
        vertical-align: middle;
      }
    }
  }
`;
