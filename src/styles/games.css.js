import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

export const GameList = styled.ul`
  margin-top: 8rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  > li {
    color: #19B9E9;
    background-color: rgba(25, 185, 233, 0.25);
    border: 1px solid;
    border-radius: 1rem;
    width: 90%;
    padding: 2rem 4rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    transition: 250ms;
    cursor: pointer;

    &:hover {
      background-color: ${lighten(0.2, 'rgba(25, 185, 233, 0.25)')};
      color: ${lighten(0.2, '#19B9E9')};
    }

    > a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      color: #ebecf1;

      > div {
        text-align: right;
      }
    }
  }

  > a {
    color: #25E1D2;
    padding: 1rem;
    border: 1px solid;
    border-radius: 1rem;
    width: 90%;
    text-align: center;
    transition: 250ms;
    cursor: pointer;

    &:hover {
      background-color: ${darken(0.05, '#0f8898')};
      color: ${darken(0.05, '#25E1D2')};
    }
  }
`;
