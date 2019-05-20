import styled from 'styled-components';
import { Button } from './shared.css';

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const RoundContainer = styled.div`
  width: 100%;
  margin: 4rem 0 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const RoundInfo = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  padding: 1rem;

  background-color: rgba(25, 185, 233, 0.25);

  > :first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: rgba(255, 255, 255, .5);

    > p {
      font-weight: 900;
      font-size: 3.2rem;
      padding: 0;
      line-height: 0;
    }
  }
  > :last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    > p {
      font-size: 1.1rem;
    }
  }
`;

export const SaveChanges = styled(Button)`
  margin: 1rem 0;
  border-radius: .5rem;
`;

export const NoChanges = styled(SaveChanges)`
  visibility: hidden;
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const AddCustomQuestion = styled(Button)`
  /* font-size: 1.2rem; */
  /* border: 1px solid #19B9E9; */
  border-radius: .5rem;
  /* background-color: rgba(25, 185, 233, 0.25); */
  /* color: white; */
  cursor: pointer;
  /* padding: .5rem 1rem; */
  /* margin: 0 0 1rem; */
  /* align-self: flex-end; */
  /* transition: .1s; */

  :hover {
    /* border: 1px solid white; */
    /* transition: .1s; */
  }
`;
