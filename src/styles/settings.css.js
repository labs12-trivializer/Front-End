import styled from 'styled-components';

export const Avatar = styled.figure`
  margin: 25px 0;
  position: relative;
  cursor: pointer;

  > img {
    display: block;
    border-radius: 10px;
    opacity: ${props => (props.avatar ? 1 : 0.5)};
    max-width: 200px;
    transition: 500ms ease;
    backface-visibility: hidden;
    box-shadow: 0px 0px 30px 10px rgba(235, 236, 241, 0.25);
  }

  &:hover img {
    opacity: 0.5;
  }

  > div.middle {
    transition: 0.5s ease;
    opacity: ${props => (props.avatar ? 0 : 1)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    > .text {
      font-variant: small-caps;
      font-weight: bold;
    }
  }

  &:hover div.middle {
    opacity: 1;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
