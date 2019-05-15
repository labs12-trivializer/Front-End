import styled from 'styled-components';

export const GameInput = styled.input`
  color: #ebecf1;
  background-color: transparent;
  border: 0 solid #d8d8dc;
  display: inline-block;
  margin-top: 8rem;
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
  font-size: .8em;
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
