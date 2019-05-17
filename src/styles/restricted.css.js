import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ebecf1;
  text-shadow: 1px 1px 4px blue, 0px 0px 1rem orangered;

  > h4 {
    font-size: 3rem;
  }

  span {
    cursor: pointer;
    text-decoration: underline;
    transition: 250ms;

    &:hover {
      opacity: 0.8;
    }
  }
`;
