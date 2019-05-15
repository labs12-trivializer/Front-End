import styled from 'styled-components';
import { lighten } from 'polished';

export const GameList = styled.ul`
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
    transform: perspective(1px) translateZ(0);
    transition: 250ms;
    cursor: pointer;

    &:hover {
      background-color: ${lighten(0.2, 'rgba(25, 185, 233, 0.25)')};
      color: ${lighten(0.2, '#19B9E9')};
      box-shadow: rgba(0,0,0,.6) 0 0 8px;
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
    box-shadow: transparent 0 0 1px;
    width: 90%;
    text-align: center;
    text-decoration: none;
    transform: perspective(1px) translateZ(0);
    transition-duration: 300ms;
    cursor: pointer;

    &:hover {
      font-weight: bold;
      letter-spacing: 1px;
      box-shadow: rgba(0,0,0,.6) 0 0 8px;
    }
  }
`;
