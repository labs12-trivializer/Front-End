import styled from 'styled-components';

export const QuestionContainer = styled.div`
  width: 100%;
  /* margin-top: 4rem; */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  margin-bottom: 1rem;
  color: white;
  /* background-color: rgba(255, 255, 255, .1) */
`;

export const QuestionText = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #19B9E9;
  padding-bottom: .5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* border: 1px solid #19B9E9;
  border-radius: .5rem; */

  > div {
    display: flex;
    align-items: center;
  }

  > :first-child {
    justify-content: flex-start;

    > * {
      margin: 1rem .5rem 0 0;
    }
  }

  > :last-child {
    justify-content: flex-end;

    > * {
      margin: 1rem 0 0 .5rem;
    }
  }
`;

export const ActionButton = styled.div`
  font-size: 1.2rem;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  background-color: rgba(25, 185, 233, 0.25);
  color: white;
  cursor: pointer;
  padding: .5rem 1rem;
  align-self: flex-end;
`;
