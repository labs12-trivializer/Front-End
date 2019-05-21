import styled from 'styled-components';
import { lighten } from 'polished';

export const GameInput = styled.input`
  color: #ebecf1;
  background-color: transparent;
  border: 0 solid #d8d8dc;
  display: inline-block;
  margin-bottom: 4rem;
  max-width: 100%;
  padding: 0;
  position: relative;
  transition-duration: 175ms;
  transition-property: transform, opacity, color, background-color, border-color,
    box-shadow, text-shadow, text-decoration-color, -webkit-transform,
    -webkit-box-shadow, -webkit-text-decoration-color;
  vertical-align: baseline;
  width: 100%;
  font-family: cursive;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;

  &:hover {
    opacity: 0.6;
    outline: 0;
    transition-duration: 0.1s;
  }
`;

export const InputControls = styled.div`
  margin-top: -3.5rem;
  color: #ebecf1;
  text-transform: uppercase;
  font-size: 0.8em;
  position: absolute;
  left: 50%;

  > span {
    margin: 0 10px;
    transition: 100ms;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid;
    }
  }
`;

export const RoundList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1 auto;
  gap: 1rem;

  > li {
    color: #19b9e9;
    background-color: rgba(25, 185, 233, 0.25);
    border: 1px solid;
    border-radius: 1rem;
    padding: 2rem 4rem;
    transform: perspective(1px) translateZ(0);
    transition: 250ms;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &:hover {
      background-color: ${lighten(0.2, 'rgba(25, 185, 233, 0.25)')};
      color: ${lighten(0.2, '#19B9E9')};
      box-shadow: rgba(0, 0, 0, 0.6) 0 0 8px;
    }

    > div {
      align-self: center;
      transition: 250ms;

      &:hover {
        color: ${lighten(0.5, '#19B9E9')};
      }

      > a {
        text-decoration: none;
        color: #ebecf1;
        font-size: 2.5rem;
        font-weight: bold;
        font-variant: small-caps;
      }
    }
  }
`;

export const GameControls = styled.div`
  text-align: center;
  margin-top: 1rem;

  /* > button {
    padding: 1rem;
    background: transparent;
    border: 1px solid;
    border-radius: 1rem;
    cursor: pointer;
    width: 100%;
    margin: 0.5rem;
    outline: none;

    &:first-child {
      color: greenyellow;
    }

    &:last-child {
      color: gold;
    }
  } */

  > a,
  button {
    color: rgb(37, 225, 210);
    background: transparent;
    box-shadow: transparent 0px 0px 1px;
    width: 100%;
    text-align: center;
    transform: perspective(1px) translateZ(0px);
    transition-duration: 300ms;
    cursor: pointer;
    padding: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: initial;
    border-image: initial;
    border-radius: 1rem;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 1rem;
    font-size: 1.6rem;

    &:hover {
      font-weight: bold;
      letter-spacing: 1px;
      box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 8px;
    }
  }
`;
