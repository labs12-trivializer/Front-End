import styled from 'styled-components';

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
  margin-top: 4rem;
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

export const SaveChanges = styled.button`
  font-size: 1.2rem;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  background-color: rgba(25, 185, 233, 0.25);
  color: white;
  cursor: pointer;
  padding: .5rem 1rem;
  margin: 1rem 0;
  align-self: flex-end;
`;

export const NoChanges = styled.button`
  font-size: 1.2rem;
  border: 1px solid #19B9E9;
  border-radius: .5rem;
  background-color: rgba(25, 185, 233, 0.25);
  color: white;
  cursor: pointer;
  margin: 1rem 0;
  padding: .5rem;
  visibility: hidden;
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;