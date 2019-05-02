import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.figure`
  margin: 25px 0;

  > img {
    border-radius: 10%;
    max-width: 200px;
    vertical-align: middle;
  }

  > button {
    margin-left: 15px;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;

  > div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  > button {
    width: 50%;
    align-self: center;
    margin-top: 10px;
    padding: 5px;
    background-color: rgb(31, 71, 115);
    color: white;
    border: none;
    border-radius: 5px;
  }
`;
